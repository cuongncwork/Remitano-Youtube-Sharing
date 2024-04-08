import { call, put, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import API from '../../../../services/api';
import { getVideos, shareVideo, voteVideo, removeVoteVideo } from './index';
import { HomeTypes } from '../../reducer/home';
import { ShareParams, Video, Vote, VoteParams } from '../../../../../types';
import { mockVideo } from '../../../../../mock';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Home sagas', () => {
  it('should handle getVideos saga', () => {
    const videos = [mockVideo];

    return expectSaga(getVideos)
      .provide([[call(API.getVideos), videos]])
      .put({ type: HomeTypes.GET_VIDEOS_SUCCESS, videos })
      .run();
  });

  it('should handle getVideos saga with error', () => {
    const error = new Error('API Error');

    return expectSaga(getVideos)
      .provide([[matchers.call.fn(API.getVideos), throwError(error)]])
      .put({ type: HomeTypes.GET_VIDEOS_FAILURE, error: 'API Error' })
      .run();
  });

  it('should handle shareVideo saga success', () => {
    const params: ShareParams = { video: { user_id: 1, url: 'https://youtu.be/zoEtcR5EW08' } };
    const callback = jest.fn();

    return expectSaga(shareVideo, { params, callback, type: HomeTypes.SHARE_VIDEO_REQUEST })
      .provide([[call(API.shareVideo, params), mockVideo]])
      .put({ type: HomeTypes.SHARE_VIDEO_SUCCESS })
      .run()
      .then(() => {
        expect(callback).toHaveBeenCalled();
      });
  });

  it('should handle voteVideo saga', () => {
    const params: VoteParams = { vote: { id: 1, video_id: 1, user_id: 1, vote_type: 1 } };

    return expectSaga(voteVideo, { params, type: HomeTypes.VOTE_VIDEO_REQUEST })
      .provide([[call(API.vote, params), undefined]])
      .put({ type: HomeTypes.VOTE_VIDEO_SUCCESS, videoId: params.vote.video_id })
      .run();
  });

  it('should handle removeVoteVideo saga', () => {
    const vote: Vote = { id: 1, video_id: 1, user_id: 1, vote_type: 1 };

    return expectSaga(removeVoteVideo, { vote, type: HomeTypes.REMOVE_VOTE_VIDEO_REQUEST })
      .provide([[call(API.removeVote, vote.id), mockVideo]])
      .put({ type: HomeTypes.REMOVE_VOTE_VIDEO_SUCCESS, video: mockVideo })
      .run();
  });
});
