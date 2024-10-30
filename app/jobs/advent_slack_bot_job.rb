# frozen_string_literal: true

class AdventSlackBotJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    PostConfig.all.distinct.pluck(:leaderboard_id).each do |leaderboard_id|
      BotJob.perform_later(leaderboard_id)
    end
  end
end
