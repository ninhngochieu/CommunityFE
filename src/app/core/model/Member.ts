export interface Photo {
  id: number,
  url: string,
  isMain: boolean
}

export interface Member {
  id: number;
  userName: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photoUrl: string;
  photos: Photo[]
}
