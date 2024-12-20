# frozen_string_literal: true

class BuildSlackPost
  ORDER_BY_STARS = { stars: :desc, score: :desc, created_at: :asc }
  ORDER_BY_SCORE = { score: :desc, stars: :desc, created_at: :asc }
  START_HEADER = 'Stars ⭐'
  SCORE_HEADER = 'Score #'

  # Test message formating
  # https://api.slack.com/docs/messages/builder

  def initialize(leaderboard)
    @leaderboard = leaderboard
    @ordering_by = @leaderboard.post_config.order_by
    @display_other = @leaderboard.post_config.display_other
  end

  def build_post_message(stars_change_members = [], new_members = [])
    score_rows = @leaderboard.last_scores.order(ordering).map do |score|
      first_part = (by_stars? ? score.stars : score.score).to_s.ljust(12, "\u2007")
      second_part = if @display_other
                      (by_stars? ? score.score : score.stars).to_s.ljust(12, "\u2007")
                    else
                      ''
                    end
      row = "#{first_part}#{second_part}#{score.member.name}"
      add_emoji(row,
                stars_change_members.include?(score.member),
                new_members.include?(score.member))
    end
    "#{header}\n#{score_rows.join("\n")}"
  end

  def header
    first_part = (by_stars? ? START_HEADER : SCORE_HEADER).ljust(12, "\u2007")
    second_part = if @display_other
                    (by_stars? ? SCORE_HEADER : START_HEADER).ljust(12, "\u2007")
                  else
                    ''
                  end
    "*#{first_part}#{second_part}#{link(@leaderboard.url)}*"
  end

  private

  def by_stars?
    @ordering_by == 'stars'
  end

  def ordering
    if by_stars?
      ORDER_BY_STARS
    else
      ORDER_BY_SCORE
    end
  end

  def add_emoji(row, add_tada, add_wave)
    if add_wave
      "*#{row} 👋*"
    elsif add_tada
      "*#{row} 🎉*"
    else
      row
    end
  end

  def link(leaderboard_url)
    ordering = +'?order='
    ordering << (by_stars? ? 'stars' : 'local_score')
    "<#{leaderboard_url}#{ordering}|*Leaderboard*>"
  end
end
