class CreateLeaderboards < ActiveRecord::Migration[6.0]
  def change
    create_table :leaderboards do |t|
      t.integer :leaderboard_id, null: false
      t.string :token, null: false
      t.string :channel, null: false

      t.timestamps
    end
  end
end
