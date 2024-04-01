require "rails_helper"

RSpec.describe NotificationsChannel, type: :channel do
  before do
    stub_connection
  end

  it "subscribes to a stream" do
    subscribe

    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("share_video_notification")
    expect(subscription).to have_stream_for("share_video_notification")
  end
end
