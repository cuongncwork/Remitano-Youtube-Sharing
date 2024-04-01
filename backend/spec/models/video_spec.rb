require "rails_helper"

RSpec.describe Video, type: :model do
  let(:user) { FactoryBot.create(:user) }

  subject {
    described_class.new(url: "https://www.youtube.com/watch?v=775IUf-FNtg", user_id: user.id)
  }

  describe "Associations" do
    it { should belong_to(:user) }
  end

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without url" do
      subject.url = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:url].first).to eq "Youtube URL required"
    end

    it "is not valid with invalid youtube url" do
      subject.url = Faker::Internet.url
      expect(subject).to_not be_valid
      expect(subject.errors[:url].first).to eq "Youtube URL invalid"
    end

    it "is not valid without user" do
      subject.user_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:user].first).to eq "must exist"
    end
  end
end
