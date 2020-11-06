class SlackPost

  ORDER_BY_STARS = { stars: :desc, score: :desc }
  ORDER_BY_SCORE = {score: :desc, stars: :desc}
  START_HEADER = '*Stars* ⭐*'
  SCORE_HEADER = '*Score* ➕'

  def initialize(leaderboard)
    @leaderboard = leaderboard
    @ordering_by = @leaderboard.ordering.order_by
    @display_other = @leaderboard.ordering.display_other
  end

  def post(new_score_members, new_members)
    scores = @leaderboard.last_scores.order(ordering).map do |score|
      row = "#{member.stars.to_s.ljust(20)}#{member.name}"
      row = "*#{row}* :tada:" if @new_score_member_ids.include? member.member_id
      row
    end
    header = "#{'*Stars* ⭐'.ljust(15)}<https://adventofcode.com/2019/leaderboard/private/view/704521|*Leaderboard*>️"
    [header, *scores].join("\n")
  end



  def header
    first_part = @ordering_by == :stars ? START_HEADER : SCORE_HEADER
    second_part = if @display_other
                    @ordering_by != :stars ? START_HEADER : SCORE_HEADER
                  else
                    ''
                  end
    link = "<#{@leaderboard.url}|*Leaderboard*>"
    header = link
  end

  private

  def ordering
    if @ordering_by == :stars
      ORDER_BY_STARS
    else
      ORDER_BY_SCORE
    end
  end
end
