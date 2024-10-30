# frozen_string_literal: true

require_relative '../support/leaderboard_data_mock'

RSpec.describe MemberScoreParser do
  let(:instance) { described_class.new(leaderboard) }
  let(:leaderboard) { create(:leaderboard) }

  before do
    response_double = instance_double(HTTParty::Response, body: LeaderboardDataMock::MOCK, code: 200)
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
        already_created_member = create(:member, member_id: 12_340, leaderboard: leaderboard, name: nil)
        subject
        already_created_member.reload
        expect(already_created_member.name).to eq 'Foxtrot'
        expect(instance.new_members.size).to eq 5
        expect(instance.new_members).not_to include(already_created_member)
      end
    end

    describe 'keeping scores' do
      context 'when the leaderboard was empty' do
        it 'create a score for every member' do
          subject
          expect(MemberScore.count).to eq 6
          expect(instance.stars_change_members.size).to eq 6
        end
      end

      context 'when a member still have the same score' do
        it 'doenst not create a new member_score' do
          already_created_member = create(:member, member_id: 12_340, leaderboard: leaderboard, name: nil)
          create(:member_score, member: already_created_member, score: 101, stars: 19)
          expect(already_created_member.scores.count).to eq 1
          expect(already_created_member.scores.first.stars).to eq 19
          subject
          already_created_member.reload
          expect(already_created_member.scores.count).to eq 1
          expect(instance.stars_change_members.size).to eq 5
        end
      end
    end
  end

  describe '#remove_leaved_members' do
    subject { instance.remove_leaved_members([12_340]) }

    let!(:member_to_remove) { create(:member, leaderboard: leaderboard) }
    let!(:member_to_keep) { create(:member, leaderboard: leaderboard, member_id: 12_340) }

    it 'delete member if not in remote data' do
      member_to_remove_id = member_to_remove.id
      member_to_keep_id = member_to_keep.id
      subject
      expect(Member.find_by(id: member_to_remove_id)).to be_nil
      expect(Member.find_by(id: member_to_keep_id)).to eq member_to_keep
    end
  end
end
