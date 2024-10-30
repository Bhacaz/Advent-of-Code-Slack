# frozen_string_literal: true

class PostConfig < ApplicationRecord
  belongs_to :leaderboard

  enum :order_by, { stars: 0, score: 1 }

  encrypts :webhook_url

  validates :channel, presence: true
  validates :webhook_url, presence: true
end
