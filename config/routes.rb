Rails.application.routes.draw do
  get 'post_configs/new'
  get 'post_configs/show'
  get 'post_configs/delete'
  get 'post_configs/update'
  get 'post_configs/edit'
  get 'post_configs/create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'leaderboards#new'
  resources :leaderboards
  get 'leaderboards/:id/post_configs' => 'leaderboards#show_post_configs', as: :show_post_configs_leaderboards
  match 'leaderboards/:id/post_configs' => 'leaderboards#update_post_configs', as: :update_post_configs_leaderboards, via: [:patch, :post]
end
