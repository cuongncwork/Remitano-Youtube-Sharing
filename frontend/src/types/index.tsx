export type StateProp = {
  auth: { isLoggedIn: boolean; user: User; isProcessing: boolean };
  home: { videos: Video[]; loading: boolean; error: string };
};

export type LoginParams = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
};

export type ShareParams = {
  video: { url: string; user_id: number };
};

export type Video = {
  id: number;
  video_id: string;
  url: string;
  title: string;
  description: string;
  embed_html: string;
  user: User;
  votes: Vote[];
};
