class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.references :leaderboard
      t.integer :member_id
      t.string :name

      t.timestamps
    end
  end
end
