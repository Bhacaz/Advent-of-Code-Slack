class CreatePostConfigs < ActiveRecord::Migration[6.0]
  def change
    create_table :post_configs do |t|
      t.references :leaderboard
      t.string :channel, null: false
      t.string :webhook_url, null: false
      t.integer :order_by, null: false
      t.boolean :display_other

      t.timestamps
    end
  end
end
