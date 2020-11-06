class MemberScoreParser
  attr_reader :new_members, :score_change_members

  def initialize(leaderboard)
    @leaderboard = leaderboard
    @new_members = []
    @score_change_members = []
  end

  def parse
    data = @leaderboard.fetch_leaderboard_data

    ActiveRecord::Base.transaction do
      data['members'].map do |member_id, member_data|
        member = Member.find_or_initialize_by(
          leaderboard_id: @leaderboard.id,
          member_id: member_id
        )
        member.name = member_data['name']

        @new_members << member if member.new_record?

        member.save!

        # TODO: Make it more perfo
        last_score= member.scores.last&.score

        if last_score != member_data['local_score']
          member.scores.create!(
            stars: member_data['stars'],
            score: member_data['local_score']
          )
          @score_change_members << member
        end
      end
    end
  end
end
