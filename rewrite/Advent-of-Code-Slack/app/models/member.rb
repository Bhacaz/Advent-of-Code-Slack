class Member < ApplicationRecord
  belongs_to :leaderboard
  has_many :scores, class_name: 'MemberScore', dependent: :destroy

  validates :member_id, presence: true, uniqueness: { scope: :leaderboard_id }

  def name
    super || "(anonymous user ##{member_id})"
  end
end
