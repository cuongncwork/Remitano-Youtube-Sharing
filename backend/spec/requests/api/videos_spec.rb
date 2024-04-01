require "rails_helper"

RSpec.describe "Api::Videos", type: :request do
  describe "GET /index" do
    let!(:videos) { create_list(:video, 10) }

    before do
      get "/api/videos"
    end

    it "return ok status" do
      expect(response.status).to eq 200
    end

    it "return correct videos length" do
      expect(JSON.parse(response.body).length).to eq Video.all.length
    end
  end

  describe "POST /create" do
    let!(:videos) { create_list(:video, 10) }
    user = FactoryBot.create :user

    context "with valid youtube url and video avaiable" do
      before do
        url = "https://www.youtube.com/watch?v=775IUf-FNtg"
        auth_request(user, "post", "/api/videos", { video: { url: url, user_id: user.id } })
      end

      it "return ok status" do
        expect(response.status).to eq 200
      end

      it "return correct title" do
        expect(JSON.parse(response.body)["title"]).to eq "Video phóng sự Cao Cường - Phương Ngọc Wedding"
      end

      it "return correct description" do
        expect(JSON.parse(response.body)["description"]).to eq "Đám cưới Cao Cường - Phương Ngọc tại nhà gái (An Khê - Gia Lai)"
      end
    end

    context "with valid youtube url and video not avaiable" do
      before do
        url = "https://www.youtube.com/watch?v=775IUf-23az"
        auth_request(user, "post", "/api/videos", { video: { url: url, user_id: user.id } })
      end

      it "return not found status" do
        expect(response.status).to eq 404
      end

      it "return not found message" do
        expect(JSON.parse(response.body)["message"]).to eq "Youtube video not found"
      end
    end

    context "with invalid youtube url" do
      before do
        url = Faker::Internet.url
        auth_request(user, "post", "/api/videos", { video: { url: url, user_id: user.id } })
      end

      it "return bad request status" do
        expect(response.status).to eq 400
      end

      it "return bad request message" do
        expect(JSON.parse(response.body)["message"]).to eq "Youtube URL invalid"
      end
    end

    context "with unauthorized user" do
      before do
        url = "https://www.youtube.com/watch?v=775IUf-FNtg"
        post "/api/videos", params: { video: { url: url, user_id: user.id } }
      end

      it "return unauthorized status" do
        expect(response.status).to eq 401
      end

      it "return unauthorized message" do
        expect(JSON.parse(response.body)["error"]).to eq "Not Authorized"
      end
    end
  end
end
