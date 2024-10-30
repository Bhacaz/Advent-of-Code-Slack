class TrySlackPostJob < ApplicationJob
  queue_as :default

  def perform(leaderboard_id)
    leaderboard = Leaderboard.find(leaderboard_id)
    parser = MemberScoreParser.new(leaderboard)
    parser.parse

    slack_message = BuildSlackPost
                    .new(leaderboard)
                    .build_post_message

    SlackJob.perform_later(leaderboard_id, slack_message)
  end
end
