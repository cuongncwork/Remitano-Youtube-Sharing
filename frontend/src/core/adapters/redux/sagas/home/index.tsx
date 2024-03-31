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
      error: ex?.message || 'Get videos error',
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
      error: ex?.message || 'Share video error',
    });
  }
}
