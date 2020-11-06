class CreatePostContents < ActiveRecord::Migration[6.0]
  def change
    create_table :post_contents do |t|
      t.references :leaderboard
      t.integer :order_by, null: false
      t.boolean :display_other

      t.timestamps
    end
  end
end
