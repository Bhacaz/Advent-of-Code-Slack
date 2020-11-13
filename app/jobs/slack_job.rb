class SlackJob < ApplicationJob
  ICON = 'https://minapecheux.com/wp/wp-content/uploads/2019/12/advent_of_code-icon2.png'
  queue_as :default

  def perform(leaderboard_id, message)
    leaderboard = Leaderboard.find(leaderboard_id)
    body = {
      channel: leaderboard.post_config.channel,
      username: 'Advent of code',
      icon_url: ICON,
      text: message
    }.to_json

    HTTParty.post(leaderboard.post_config.webhook_url, body: body)
  end
end
