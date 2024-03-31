Rails.application.routes.draw do
  post "login" => "session#login"
  get "get_user" => "session#get_user"

  mount ActionCable.server => '/cable'
end
