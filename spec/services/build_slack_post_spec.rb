# # frozen_string_literal: true
#
# describe BuildSlackPost do
# 	let(:instance) { described_class.new(leaderboard) }
#   let(:post_config) { create :post_config }
#   let(:leaderboard) { post_config.leaderboard }
#
# 	describe '#build_post_message' do
#     let(:members) { create_list :member, 3, leaderboard: leaderboard }
#     let!(:member_score) do
#       members.each_with_index { |member, index| create :member_score, member: member, score: 10 ** index, stars: 100 ** index }
# 		end
# 		subject { instance.build_post_message(score_change_members = [], new_members = []) }
#
# 		it '' do
#       p subject
#       puts subject
#
# 		end
# 	end
#
# 	describe '#header' do
# 		subject { instance.header }
#
# 		it '' do
#
# 		end
# 	end
# end
