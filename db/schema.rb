# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 0) do
    create_table "leaderboards", force: :cascade do |t|
      t.integer "leaderboard_id", null: false
      t.string "token", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["leaderboard_id"], name: "index_leaderboards_on_leaderboard_id"
    end

    create_table "member_scores", force: :cascade do |t|
      t.bigint "member_id"
      t.integer "stars"
      t.integer "score"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["member_id"], name: "index_member_scores_on_member_id"
    end

    create_table "members", force: :cascade do |t|
      t.bigint "leaderboard_id"
      t.integer "member_id"
      t.string "name"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["leaderboard_id", "member_id"], name: "index_members_on_leaderboard_id_and_member_id", unique: true
      t.index ["leaderboard_id"], name: "index_members_on_leaderboard_id"
    end

    create_table "post_configs", force: :cascade do |t|
      t.bigint "leaderboard_id"
      t.string "channel", null: false
      t.string "webhook_url", null: false
      t.integer "order_by", null: false
      t.boolean "display_other"
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["leaderboard_id"], name: "index_post_configs_on_leaderboard_id"
    end
end
