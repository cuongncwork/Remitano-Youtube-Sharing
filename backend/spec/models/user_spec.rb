require "rails_helper"

RSpec.describe User, type: :model do
  subject {
    described_class.new(email: Faker::Internet.email, password: Faker::Internet.password)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without email" do
    subject.email = nil
    expect(subject).to_not be_valid
    expect(subject.errors[:email].first).to eq "is required"
  end

  it "is not valid with invalid email format" do
    subject.email = "aaa@aaa"
    expect(subject).to_not be_valid
    expect(subject.errors[:email].first).to eq "format invalid"
  end

  it "is not valid without password" do
    subject.password = nil
    expect(subject).to_not be_valid
    expect(subject.errors[:password].first).to eq "is required"
  end

  it "is not valid with password to short" do
    subject.password = "123456"
    expect(subject).to_not be_valid
    expect(subject.errors[:password].first).to eq "at least 8 characters"
  end
end
