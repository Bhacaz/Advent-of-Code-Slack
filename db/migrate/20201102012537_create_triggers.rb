class CreateTriggers < ActiveRecord::Migration[6.0]
  def change
    create_table :triggers do |t|
      t.references :leaderboard
      t.integer :interval_trigger, null: false

      t.timestamps
    end
  end
end
