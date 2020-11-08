class SlackPost

  ORDER_BY_STARS = { stars: :desc, score: :desc }
  ORDER_BY_SCORE = {score: :desc, stars: :desc}
  START_HEADER = 'Stars ⭐'
  SCORE_HEADER = 'Score #'

  # Test message formating
  # https://api.slack.com/docs/messages/builder

  def initialize(leaderboard)
    @leaderboard = leaderboard
    @ordering_by = @leaderboard.post_config.order_by
    @display_other = @leaderboard.post_config.display_other
  end

  def build_post_message(score_change_members = [], new_members = [])
    score_rows = @leaderboard.last_scores.order(ordering).map do |score|
      first_part = (by_stars? ? score.stars : score.score).to_s.ljust(8, "\t")
      second_part = if @display_other
                      (!by_stars? ? score.stars : score.score).to_s.ljust(8, "\t")
                    else
                      ''
                    end
      row = "#{first_part}#{second_part}#{score.member.name}"
      add_emoji(row,
                score_change_members.include?(score.member),
                new_members.include?(score.member))
    end
    "#{header}\n#{score_rows.join("\n")}"
  end

  def header
    first_part = (by_stars? ? START_HEADER : SCORE_HEADER).ljust(10, "\t")
    second_part = if @display_other
                    (!by_stars? ? START_HEADER : SCORE_HEADER).ljust(10, "\t")
                  else
                    ''
                  end
    link = "<#{@leaderboard.url}|*Leaderboard*>"
    "*#{first_part}#{second_part}#{link}*"
  end

  private
  
  def by_stars?
    @ordering_by == :stars
  end

  def ordering
    if by_stars?
      ORDER_BY_STARS
    else
      ORDER_BY_SCORE
    end
  end

  def add_emoji(row, add_tada, add_wave)
    if add_tada || add_wave
      emoji = add_tada ? '🎉' : '👋'
      row = "*#{row}\t#{emoji}*"
    end
    row
  end
end
