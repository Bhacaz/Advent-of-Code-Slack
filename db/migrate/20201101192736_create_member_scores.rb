class CreateMemberScores < ActiveRecord::Migration[6.0]
  def change
    create_table :member_scores do |t|
      t.references :member
      t.integer :stars
      t.integer :score

      t.timestamps
    end
  end
end
