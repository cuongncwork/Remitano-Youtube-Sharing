class Vote < ApplicationRecord
  belongs_to :video
  belongs_to :user

  validates :vote_type, presence: { message: "Missing vote type" }
end
