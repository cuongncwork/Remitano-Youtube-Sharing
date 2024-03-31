class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :video_id
      t.string :url
      t.string :title
      t.text :description
      t.text :embed_html
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
