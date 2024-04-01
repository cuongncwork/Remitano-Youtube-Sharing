module AuthHelpers
  def headers(user)
    { "Authorization": JsonWebToken.encode(user_id: user.id) }
  end

  def auth_request(user, type, route, params = {})
    case type
    when "post"
      post route, params: params, headers: headers(user)
    when "put"
      put route, params: params, headers: headers(user)
    when "get"
      get route, params: params, headers: headers(user)
    when "delete"
      delete route, params: params, headers: headers(user)
    end
  end
end
