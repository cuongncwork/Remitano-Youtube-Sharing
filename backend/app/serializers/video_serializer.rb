class VideoSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :votes

  attributes :id, :video_id, :title, :description, :embed_html
end
