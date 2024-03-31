class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "new_shared_video_notification"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
