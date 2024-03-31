export type User = {
  id: number;
  email: string;
};

export type StateProp = {
  auth: { isLoggedIn: boolean; user: User; isProcessing: boolean };
  home: {};
};

export type LoginParams = {
  email: string;
  password: string;
};
