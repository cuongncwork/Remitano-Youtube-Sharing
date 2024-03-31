class Video < ApplicationRecord
  belongs_to :users

  validates :url, presence: { message: "Youtube URL required" }, format: { with: /^http[s]*:\/\/[www\.]*youtu[.]{1}*be[.com]{4}*\/[watch\?v=]*([a-zA-Z0-9_-]*)/, message: "Youtube URL invalid" }
end
