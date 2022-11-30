class AddUniqIndex < ActiveRecord::Migration[6.1]
  def change
    change_table :members do |t|
      t.index %i[leaderboard_id member_id], unique: true
    end
  end
end
