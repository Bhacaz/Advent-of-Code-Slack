# frozen_string_literal: true

require_relative '../support/leaderboard_data_mock'

RSpec.describe MemberScoreParser do
	let(:instance) { described_class.new(leaderboard) }
  let(:leaderboard) { create(:leaderboard) }

  before :each do
    response_double = instance_double(HTTParty::Response, body:LeaderboardDataMock::MOCK)
    allow(HTTParty).to receive(:get) { response_double }
  end

	describe '#parse' do
		subject { instance.parse }

    context 'when the leaderboard is empty' do
      it 'create many member' do
        subject
        expect(leaderboard.members.size).to eq 6
			end
    end

    context 'when a member was already saved' do
      it 'doesnt added' do
        already_created_member = create :member, member_id: 12340, leaderboard: leaderboard, name: nil
        expect(already_created_member.name).to be_nil
        subject
        already_created_member.reload
        expect(already_created_member.name).to eq 'Foxtrot'
        expect(instance.new_members.size).to eq 5
        expect(instance.new_members).to_not include(already_created_member)
      end
    end

    describe 'keeping scores' do
      context 'when the leaderboard was empty' do
        it 'create a score for every member' do
          subject
          expect(MemberScore.count).to eq 6
          expect(instance.score_change_members.size).to eq 6
        end
      end

      context 'when a member still have the same score' do
        it 'doenst not create a new member_score' do
          already_created_member = create :member, member_id: 12340, leaderboard: leaderboard, name: nil
          create :member_score, member: already_created_member, score: 101
          expect(already_created_member.scores.count).to eq 1
          expect(already_created_member.scores.first.score).to eq 101
          subject
          already_created_member.reload
          expect(already_created_member.scores.count).to eq 1
          expect(instance.score_change_members.size).to eq 5
        end
      end
    end
	end
end
