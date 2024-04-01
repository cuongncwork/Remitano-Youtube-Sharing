import { call, put, select } from 'redux-saga/effects';
import API from '../../../../services/api';
import { HomeTypes } from '../../reducer/home';
import { ShareParams, Video, Vote, VoteParams } from '../../../../../types';
import { toast } from 'react-toastify';

export function* getVideos() {
  try {
    const videos: Video[] = yield call(API.getVideos);
    yield put({
      type: HomeTypes.GET_VIDEOS_SUCCESS,
      videos,
    });
  } catch (ex: any) {
    yield put({
      type: HomeTypes.GET_VIDEOS_FAILURE,
      error: ex?.response?.data?.message || ex?.message || 'Get videos error',
    });
  }
}

export function* shareVideo({
  params,
  callback,
  type,
}: {
  params: ShareParams;
  callback: () => void;
  type: string;
}) {
  try {
    const video: Video = yield call(API.shareVideo, params);
    yield put({
      type: HomeTypes.SHARE_VIDEO_SUCCESS,
      video,
    });
    toast.success('Share movie successfully');
    callback();
  } catch (ex: any) {
    yield put({
      type: HomeTypes.SHARE_VIDEO_FAILURE,
      error: ex?.response?.data?.message || ex?.message || 'Share video error',
    });
  }
}

export function* voteVideo({ params, type }: { params: VoteParams; type: string }) {
  try {
    const vote: Vote = yield call(API.vote, params);
    const videos: Video[] = yield select((state) => state.home.videos);
    const video: Video | undefined = videos.find((v) => v.id === params.vote.video_id);

    if (video) {
      const { votes } = video;
      const updatedVotes = [...votes, vote];

      yield put({
        type: HomeTypes.VOTE_VIDEO_SUCCESS,
        video: { ...video, votes: updatedVotes },
      });
    }
  } catch (ex: any) {
    yield put({
      type: HomeTypes.VOTE_VIDEO_FAILURE,
      error: ex?.response?.data?.message || ex?.message || 'Vote video error',
    });
  }
}

export function* removeVoteVideo({ vote, type }: { vote: Vote; type: string }) {
  try {
    yield call(API.removeVote, vote.id);
    const videos: Video[] = yield select((state) => state.home.videos);
    const video: Video | undefined = videos.find((v) => v.id === vote.video_id);

    if (video) {
      const { votes } = video;
      const voteIndex = votes.findIndex((v) => v.id === vote.id);
      const updatedVotes = [...votes];
      updatedVotes.splice(voteIndex, 1);

      yield put({
        type: HomeTypes.REMOVE_VOTE_VIDEO_SUCCESS,
        video: { ...video, votes: updatedVotes },
      });
    }
  } catch (ex: any) {
    yield put({
      type: HomeTypes.REMOVE_VOTE_VIDEO_FAILURE,
      error: ex?.response?.data?.message || ex?.message || 'Remove vote video error',
    });
  }
}
