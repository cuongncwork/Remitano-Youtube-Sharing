class Api::VotesController < ApplicationController
  before_action :get_vote, only: :destroy

  def create
    vote = Vote.new vote_params
    if vote.save
      render json: vote
    else
      render json: { message: vote.errors.full_messages.to_sentence }, status: 400
    end
  end

  def destroy
    @vote.destroy
    if @vote.destroyed?
      render json: { message: "Delete successfully" }
    else
      render json: { message: @vote.errors.full_messages.to_sentence }, status: 400
    end
  end

  private

  def vote_params
    params.require(:vote).permit :user_id, :vote_type, :video_id
  end

  def get_vote
    @vote = Vote.find_by_id params[:id]
    unless @vote
      render json: { message: "Vote not found" }, status: 404
      return
    end
  end
end
