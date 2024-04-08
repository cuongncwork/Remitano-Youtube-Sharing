import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ApiService from './api';
import Cookies from 'js-cookie';

describe('ApiService', () => {
  let apiService: typeof ApiService;
  let mock: MockAdapter;

  beforeEach(() => {
    apiService = new ApiService();
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should add Authorization header', () => {
    apiService.addAuthorizationHeader('testToken');
    expect(apiService.INSTANCE.defaults.headers.Authorization).toBe('Bearer testToken');
  });

  it('should remove Authorization header', () => {
    apiService.removeAuthorizationHeader();
    expect(apiService.INSTANCE.defaults.headers.Authorization).toBeNull();
  });

  it('should login', async () => {
    mock.onPost('login').reply(200, { token: 'testToken' });
    const token = await apiService.login({ email: 'test@gmail.com', password: 'test' });
    expect(token).toBe('testToken');
    expect(Cookies.get('token')).toBe('testToken');
  });

  it('should get user', async () => {
    mock.onGet('get_user').reply(200, { user: 'testUser' });
    const user = await apiService.getUser();
    expect(user).toEqual({ user: 'testUser' });
  });

  it('should get videos', async () => {
    mock.onGet('videos').reply(200, { videos: ['video1', 'video2'] });
    const videos = await apiService.getVideos();
    expect(videos).toEqual({ videos: ['video1', 'video2'] });
  });

  it('should share video', async () => {
    mock.onPost('videos').reply(200, { success: true });
    const response = await apiService.shareVideo({ video: { user_id: 1, url: 'testUrl' } });
    expect(response).toEqual({ success: true });
  });

  it('should vote', async () => {
    mock.onPost('votes').reply(200, { success: true });
    const response = await apiService.vote({
      vote: { id: 1, vote_type: 1, video_id: 1, user_id: 1 },
    });
    expect(response).toEqual({ success: true });
  });

  it('should remove vote', async () => {
    mock.onDelete('votes/1').reply(200, { success: true });
    const response = await apiService.removeVote(1);
    expect(response).toEqual({ success: true });
  });
});
