class AdventSlackBotJob < ApplicationJob
  queue_as :default

  def perform(*args)
    PostConfig.all.distinct.pluck(:leaderboard_id).each do |leaderboard_id|
      BotJob.perform_later(leaderboard_id)
    end
  end
end
