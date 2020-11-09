Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'leaderboards#new'
  resources :leaderboards, only: %i[create new]
  get 'leaderboards/:id/post_configs' => 'leaderboards#show_post_configs', as: :show_post_configs_leaderboards
  get 'leaderboards/:id/post_configs/edit' => 'leaderboards#edit_post_configs', as: :edit_post_configs_leaderboards
  match 'leaderboards/:id/post_configs' => 'leaderboards#update_post_configs', as: :update_post_configs_leaderboards, via: [:patch, :post]
  post 'leaderboards/:id/slack_test' => 'leaderboards#slack_test', as: :slack_test_leaderboards
end
