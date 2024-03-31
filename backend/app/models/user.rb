class User < ApplicationRecord
  has_secure_password

  has_many :videos, dependent: :destroy
  has_many :votes, dependent: :destroy

  validates_uniqueness_of :email, on: :create, message: "existed"
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, message: "format invalid" }
  validates :password, presence: true, length: { minimum: 8 }
end
