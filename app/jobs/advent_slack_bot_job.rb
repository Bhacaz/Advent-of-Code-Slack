class AdventSlackBotJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Leaderboard.all.ids.each do |leaderboard_id|
      BotJob.perform_later(leaderboard_id)
    end
  end
end
