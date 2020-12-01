class Member < ApplicationRecord
  belongs_to :leaderboard
  has_many :scores, class_name: 'MemberScore', dependent: :destroy
end
