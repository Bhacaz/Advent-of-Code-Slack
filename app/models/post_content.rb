class PostContent < ApplicationRecord
  enum order_by: { stars: 0, score: 1 }

  belongs_to :leaderboard
end
