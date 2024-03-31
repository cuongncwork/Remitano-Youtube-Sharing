class Api::SessionController < ApplicationController
  skip_before_action :authenticate_request, only: :login

  def login
    # Check email existed
    user = User.find_by_email params[:email]

    # Create user if email not exist
    unless user
      user = User.new(email: params[:email], password: params[:password], password_confirmation: params[:password])

      if !user.save
        render json: { message: user.errors.full_messages.to_sentence }, status: 400
        return
      end
    end

    command = AuthenticateUser.call params[:email], params[:password]

    if command.success?
      render json: { token: command.result }
    else
      render json: { error: command.errors.full_messages.to_sentence }, status: :unauthorized
    end
  end

  def get_user
    render json: current_user
  end
end
