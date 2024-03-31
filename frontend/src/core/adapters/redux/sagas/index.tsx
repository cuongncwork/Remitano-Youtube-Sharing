import { all, takeLatest } from 'redux-saga/effects';
import { HomeTypes } from '../reducer/home';
import { AuthTypes } from '../reducer/auth';
import { checkLoggedIn, signIn, signOut } from './auth';
import { getVideos, removeVoteVideo, shareVideo, voteVideo } from './home';

const authSagas = [];

const homeSagas = [];

export default function* root() {
  yield all([...homeSagas, ...authSagas]);
}
