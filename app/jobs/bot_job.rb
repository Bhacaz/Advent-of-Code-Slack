# frozen_string_literal: true

class BotJob < ApplicationJob
  queue_as :default

  def perform(leaderboard_id)
    leaderboard = Leaderboard.find(leaderboard_id)
    parser = MemberScoreParser.new(leaderboard)
    parser.parse

    return if parser.nothing_new?

    slack_message = BuildSlackPost
                    .new(leaderboard)
                    .build_post_message(parser.stars_change_members, parser.new_members)

    SlackJob.perform_later(leaderboard_id, slack_message)
  end
end
