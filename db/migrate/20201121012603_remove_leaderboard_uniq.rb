class RemoveLeaderboardUniq < ActiveRecord::Migration[6.0]
  def change
    remove_index :leaderboards, column: :leaderboard_id
    add_index :leaderboards, :leaderboard_id
  end
end
