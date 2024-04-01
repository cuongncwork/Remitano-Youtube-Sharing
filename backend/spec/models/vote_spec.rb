require "rails_helper"

RSpec.describe Vote, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:video) { FactoryBot.create(:video) }

  subject {
    described_class.new(vote_type: 1, user_id: user.id, video_id: video.id)
  }

  describe "Associations" do
    it { should belong_to(:user) }
    it { should belong_to(:video) }
  end

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without vote type" do
      subject.vote_type = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:vote_type].first).to eq "Missing vote type"
    end

    it "is not valid without user" do
      subject.user_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:user].first).to eq "must exist"
    end

    it "is not valid without video" do
      subject.video_id = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:video].first).to eq "must exist"
    end
  end
end
