import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { Video } from '../../../../../types';

const { Types, Creators } = createActions({
  getVideos: [],
  getVideosSuccess: ['videos'],
  getVideosFailure: ['error'],

  shareVideo: ['params', 'callback'],
  shareVideoSuccess: ['video'],
  shareVideoFailure: ['error'],
});

export const INITIAL_STATE = Immutable<{ loading: boolean; videos: Video[]; error: string }>({
  loading: false,
  videos: [],
  error: '',
});

const sendRequest = (state = INITIAL_STATE) => state.set('loading', true).set('error', '');

const getVideosSuccess = (state = INITIAL_STATE, { videos }: { videos: Video[] }) =>
  state.set('loading', false).set('videos', videos);

const sendRequestFailure = (state = INITIAL_STATE, { error }: { error: string }) =>
  state.set('loading', false).set('error', error);

const shareVideoSuccess = (state = INITIAL_STATE, { video }: { video: ImmutableObject<Video> }) => {
  const videos = state.videos.asMutable();
  videos.unshift(video);
  return state.set('loading', false).set('videos', videos);
};

export const HomeTypes = Types;

export const homeReducer = createReducer(INITIAL_STATE, {
  [Types.GET_VIDEOS]: sendRequest,
  [Types.GET_VIDEOS_SUCCESS]: getVideosSuccess,
  [Types.GET_VIDEOS_FAILURE]: sendRequestFailure,

  [Types.SHARE_VIDEO]: sendRequest,
  [Types.SHARE_VIDEO_SUCCESS]: shareVideoSuccess,
  [Types.SHARE_VIDEO_FAILURE]: sendRequestFailure,
});

export const HomeActions = Creators;
