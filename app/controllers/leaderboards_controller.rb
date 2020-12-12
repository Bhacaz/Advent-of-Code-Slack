# frozen_string_literal: true

class LeaderboardsController < ApplicationController

  before_action :check_session, except: %i[new create]

  def new
    @leaderboard = Leaderboard.new
  end

  def create
    @leaderboard = Leaderboard.find_or_initialize_by(leaderboard_id: leaderboard_params[:leaderboard_id])
    @leaderboard.token = leaderboard_params[:token]

    begin
      @leaderboard.fetch_leaderboard_data
      @leaderboard.save!
    rescue
      flash.alert = 'Something went wrong while fetching leaderboard data.'
      render :new
      return
    end

    if @leaderboard.new_record? || @leaderboard.post_config.nil?
      @leaderboard.save!
      redirect_to edit_post_configs_leaderboards_path(@leaderboard)
    else
      redirect_to show_post_configs_leaderboards_path(@leaderboard)
    end
    session[:leaderboard_id] = @leaderboard.id
  end

  def destroy
    PostConfig.joins(:leaderboard).merge(Leaderboard.where(id: params[:id])).first.destroy!
    redirect_to new_leaderboard_path
    session[:leaderboard_id] = nil
  end

  def edit_post_configs
    @leaderboard = Leaderboard.find(params[:id])
    @post_config = @leaderboard.post_config || PostConfig.new(leaderboard: @leaderboard)
  end

  def update_post_configs
    post_config = PostConfig.find_or_initialize_by(leaderboard_id: params[:id])
    post_config.display_other = false unless post_configs_params.key?(:display_other)
    post_config.assign_attributes(post_configs_params)
    post_config.save!
    redirect_to show_post_configs_leaderboards_path(params[:id])
  end

  def show_post_configs
    @leaderboard = Leaderboard.find(params[:id])
    @post_config = @leaderboard.post_config
  end

  def slack_test
    leaderboard = Leaderboard.find(params[:id])
    TrySlackPostJob.perform_later(leaderboard.id)
    redirect_to show_post_configs_leaderboards_path(leaderboard)
  end

  private

  def leaderboard_params
    params.permit(:leaderboard_id, :token)
  end

  def post_configs_params
    params.required(:post_config).permit(:channel, :webhook_url, :order_by, :display_other)
  end

  def check_session
    redirect_to root_url unless session[:leaderboard_id]
  end
end
