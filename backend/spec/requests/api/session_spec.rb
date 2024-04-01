require "rails_helper"

RSpec.describe "Api::Sessions", type: :request do
  describe "POST /login" do
    context "register and login successfully with new user" do
      before do
        post "/api/login", params: { email: Faker::Internet.email, password: "12345678" }
      end

      it "return ok status" do
        expect(response.status).to eq 200
      end

      it "return token" do
        expect(JSON.parse(response.body).keys()).to include "token"
      end
    end

    context "register and login fail (wrong email format)" do
      before do
        post "/api/login", params: { email: "aaa@aaa", password: "12345678" }
      end

      it "return bad request status" do
        expect(response.status).to eq 400
      end

      it "return bad request message" do
        expect(JSON.parse(response.body)["message"]).to eq "Email format invalid"
      end
    end

    context "register and login fail (email empty)" do
      before do
        post "/api/login", params: { email: "", password: "12345678" }
      end

      it "return bad request status" do
        expect(response.status).to eq 400
      end

      it "return bad request message" do
        expect(JSON.parse(response.body)["message"]).to eq "Email is required and Email format invalid"
      end
    end

    context "register and login fail (password empty)" do
      before do
        post "/api/login", params: { email: Faker::Internet.email, password: "" }
      end

      it "return bad request status" do
        expect(response.status).to eq 400
      end

      it "return bad request message" do
        expect(JSON.parse(response.body)["message"]).to eq "Password is required and Password at least 8 characters"
      end
    end

    context "register and login fail (password too short)" do
      before do
        post "/api/login", params: { email: Faker::Internet.email, password: "123456" }
      end

      it "return bad request status" do
        expect(response.status).to eq 400
      end

      it "return bad request message" do
        expect(JSON.parse(response.body)["message"]).to eq "Password at least 8 characters"
      end
    end

    context "login successfully" do
      before do
        email = Faker::Internet.email
        password = Faker::Internet.password
        User.create(email: email, password: password, password_confirmation: password)
        post "/api/login", params: { email: email, password: password }
      end

      it "return ok status" do
        expect(response.status).to eq 200
      end

      it "return token" do
        expect(JSON.parse(response.body).keys()).to include "token"
      end
    end

    context "login fail (wrong password)" do
      before do
        email = Faker::Internet.email
        password = Faker::Internet.password
        User.create(email: email, password: password, password_confirmation: password)
        post "/api/login", params: { email: email, password: "11111111" }
      end

      it "return unauthorized status" do
        expect(response.status).to eq 401
      end

      it "return unauthorized message" do
        expect(JSON.parse(response.body)["error"]).to eq "Wrong email or password"
      end
    end
  end
end
