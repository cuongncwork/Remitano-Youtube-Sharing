class Api::VideosController < ApplicationController
  skip_before_action :authenticate_request, only: :index
  before_action :check_url, only: :create

  def index
    videos = Video.order created_at: :desc
    render json: videos
  end

  def create
    video = Video.new video_params

    if video.save
      render json: video
    else
      render json: { message: video.errors.full_messages.to_sentence }, status: 400
    end
  end

  private

  def video_params
    params.require(:video).permit(:url, :user_id).merge(video_id: @video_id, title: @title, description: @description, embed_html: @embed_html)
  end

  def check_url
    unless params[:video][:url]
      return render json: { message: "Youtube URL required" }, status: 400
    end

    youtube_id = get_youtube_id params[:video][:url]

    if youtube_id
      youtubeVideo = Yt::Video.new id: youtube_id

      video = Video.find_by_video_id youtubeVideo.id
      return render json: { message: "Youtube video already shared" }, status: 400 if video.present?

      @video_id = youtubeVideo.id
      @title = youtubeVideo.title
      @description = youtubeVideo.description
      @embed_html = youtubeVideo.embed_html
    else
      return render json: { message: "Youtube URL invalid" }, status: 400
    end
  rescue Yt::Errors::NoItems
    return render json: { message: "Youtube video not found" }, status: 404
  end

  def get_youtube_id(url)
    regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    match = regex.match(url)
    if match && !match[1].blank?
      match[1]
    else
      nil
    end
  end
end
