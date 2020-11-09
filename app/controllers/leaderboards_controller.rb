class LeaderboardsController < ApplicationController

  def new
    @leaderboard = Leaderboard.new
  end

  def delete
  end

  def create
    @leaderboard = Leaderboard.find_or_create_by!(leaderboard_params)
    redirect_to show_post_configs_leaderboards_path(@leaderboard.leaderboard_id)
  end

  def show_post_configs
    @leaderboard = Leaderboard.find_by(leaderboard_id: params[:id])
    @post_config = @leaderboard.post_config || PostConfig.new(leaderboard: @leaderboard)
  end

  def update_post_configs
    @leaderboard = Leaderboard.find_by(leaderboard_id: params[:id])
    post_config = PostConfig.find_or_initialize_by(leaderboard_id: @leaderboard.id)
    post_config.display_other = false unless post_configs_params.key?(:display_other)
    post_config.assign_attributes(post_configs_params)
    post_config.save!
    redirect_to show_post_configs_leaderboards_path(params[:id])
  end

  private

  def leaderboard_params
    params.permit(:leaderboard_id, :token)
  end

  def post_configs_params
    params.required(:post_config).permit(:channel, :webhook_url, :order_by, :display_other)
  end
end
