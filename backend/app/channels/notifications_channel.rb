class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "share_video_notification"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
