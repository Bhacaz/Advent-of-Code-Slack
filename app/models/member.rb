class Member < ApplicationRecord
  belongs_to :leaderboard
  has_many :scores, class_name: 'MemberScore', dependent: :destroy

  def name
    super || "(anonymous user ##{member_id})"
  end
end
