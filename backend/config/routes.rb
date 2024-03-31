Rails.application.routes.draw do
  namespace :api, defaults: { format: "json" } do
    post "login" => "session#login"
    get "get_user" => "session#get_user"
    resources :videos, only: [:index, :create]
  end

  mount ActionCable.server => "/cable"
end
