# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

leaderboard = Leaderboard.create!(
  leaderboard_id: '704521',
  token: '53616c7465645f5f0a4579a16a0823a9bef0feff5591cb0c77c96006dadaad7167032143ea7682b79107c5b925078a31',
  channel: 'advent-of-code'
)
