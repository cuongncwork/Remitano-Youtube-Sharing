class User < ApplicationRecord
  has_secure_password

  has_many :videos
  has_many :votes

  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, message: "format invalid" }
  validates :password, presence: true, length: { maximum: 30, minimum: 6 }
end
