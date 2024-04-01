require "rails_helper"

RSpec.describe "Api::Votes", type: :request do
  describe "POST /create" do
    user = FactoryBot.create :user
    video = FactoryBot.create :video

    context "with unauthorized user" do
      before do
        post "/api/votes", params: { vote: { vote_type: 1, user_id: user.id, video_id: video.id } }
      end

      it "return unauthorized status" do
        expect(response.status).to eq 401
      end

      it "return unauthorized message" do
        expect(JSON.parse(response.body)["error"]).to eq "Not Authorized"
      end
    end

    context "with vote success" do
      before do
        auth_request(user, "post", "/api/votes", { vote: { vote_type: 1, user_id: user.id, video_id: video.id } })
      end

      it "return ok status" do
        expect(response.status).to eq 200
      end
    end
  end

  describe "DELETE /destroy" do
    user = FactoryBot.create :user
    video = FactoryBot.create :video

    context "with unauthorized user" do
      before do
        vote = Vote.create(vote_type: 1, user_id: user.id, video_id: video.id)
        delete "/api/votes/#{vote.id}", params: {}
      end

      it "return unauthorized status" do
        expect(response.status).to eq 401
      end

      it "return unauthorized message" do
        expect(JSON.parse(response.body)["error"]).to eq "Not Authorized"
      end
    end

    context "with remove vote success" do
      before do
        vote = Vote.create(vote_type: 1, user_id: user.id, video_id: video.id)
        auth_request(user, "delete", "/api/votes/#{vote.id}", {})
      end

      it "return ok status" do
        expect(response.status).to eq 200
      end
    end
  end
end
