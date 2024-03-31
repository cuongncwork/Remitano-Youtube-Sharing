import { all, takeLatest } from 'redux-saga/effects';
import { HomeTypes } from '../reducer/home';
import { AuthTypes } from '../reducer/auth';
import { checkLoggedIn, signIn, signOut } from './auth';
import { getVideos, removeVoteVideo, shareVideo, voteVideo } from './home';

const authSagas = [
  takeLatest(AuthTypes.CHECK_LOGGED_IN, checkLoggedIn),
  takeLatest(AuthTypes.SIGN_IN, signIn),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
];

const homeSagas = [
  takeLatest(HomeTypes.GET_VIDEOS, getVideos),
  takeLatest(HomeTypes.SHARE_VIDEO, shareVideo),
  takeLatest(HomeTypes.VOTE_VIDEO, voteVideo),
  takeLatest(HomeTypes.REMOVE_VOTE_VIDEO, removeVoteVideo),
];

export default function* root() {
  yield all([...homeSagas, ...authSagas]);
}
