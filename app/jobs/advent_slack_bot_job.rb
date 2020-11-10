class AdventSlackBotJob < ApplicationJob
  queue_as :default

  def perform(*args)
    PostConfig.all.pluck(:leaderboard_id).each do |leaderboard_id|
      BotJob.perform_later(leaderboard_id)
    end
  end
end
