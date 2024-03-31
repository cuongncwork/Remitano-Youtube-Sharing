class Video < ApplicationRecord
  belongs_to :user
  has_many :votes, dependent: :destroy

  after_create :send_notification

  YOUTUBE_URL_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

  validates :url, presence: { message: "Youtube URL required" }, format: { with: YOUTUBE_URL_REGEX, message: "Youtube URL invalid" }

  private

  def send_notification
    user = User.find_by_id self.user_id
    NotificationBroadcastJob.perform_later({ id: self.id,
                                             url: self.url,
                                             title: self.title,
                                             description: self.description,
                                             embed_html: self.embed_html,
                                             user: { id: user.id, email: user.email },
                                             votes: [] })
  end
end
