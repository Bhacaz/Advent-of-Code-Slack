# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'leaderboards#new'

  resources :leaderboards, only: %i[create new destroy]
  get 'leaderboards/:id/post_configs' => 'leaderboards#show_post_configs', as: :show_post_configs_leaderboards
  get 'leaderboards/:id/post_configs/edit' => 'leaderboards#edit_post_configs', as: :edit_post_configs_leaderboards
  post 'leaderboards/:id/post_configs' => 'leaderboards#update_post_configs', as: :post_configs
  patch 'leaderboards/:id/post_configs' => 'leaderboards#update_post_configs', as: :post_config
  post 'leaderboards/:id/slack_test' => 'leaderboards#slack_test', as: :slack_test_leaderboards

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  get 'manifest' => 'rails/pwa#manifest', as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  scope '/admin' do
    mount SolidQueueDashboard::Engine, at: '/jobs'
  end
end
