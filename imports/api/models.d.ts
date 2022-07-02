interface Profile {
  phone?: string;
  picture?: string;
  status?: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  profile: Profile;
}
