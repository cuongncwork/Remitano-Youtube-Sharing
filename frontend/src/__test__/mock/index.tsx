export const mockVideo: Video = {
  id: 1,
  user: {
    id: 1,
    email: 'test@test.com',
  },
  video_id: 'zoEtcR5EW08',
  url: 'https://youtu.be/zoEtcR5EW08',
  title: 'SƠN TÙNG M-TP | CHÚNG TA CỦA TƯƠNG LAI | OFFICIAL MUSIC VIDEO',
  description: 'SƠN TÙNG M-TP | CHÚNG TA CỦA TƯƠNG LAI | OFFICIAL MUSIC VIDEO',
  embed_html:
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/zoEtcR5EW08" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  votes: [],
};

export const mockVote: Vote = {
  id: 1,
  user_id: 1,
  video_id: 1,
  vote_type: 1,
};
