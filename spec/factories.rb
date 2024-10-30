# frozen_string_literal: true

require 'factory_bot_rails'

FactoryBot.define do
  factory :leaderboard do
    leaderboard_id { 123 }
    token { 'abc' }
  end

  factory :post_config do
    leaderboard
    channel { Faker::Name.name }
    webhook_url { Faker::Internet.url }
    order_by { :stars }
    display_other { true }
  end

  factory :member do
    leaderboard
    member_id { Faker::Number.number(digits: 10) }
    name { Faker::Name.name }
  end

  factory :member_score do
    member
    score { Faker::Number.number(digits: 3) }
    stars { (1..62).to_a.sample }
  end
end
