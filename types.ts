export interface UserProps {
  uid: string;
  displayName: string;
  email: string;
  nickname: string;
  updated_at?: EpochTimeStamp;
  created_at?: EpochTimeStamp;
}

export interface JobProps {
  id?: number;
  uid: string;
  title: string;
  employmentType: string;
  category: string;
  description: string;
  salary: number;
  link: string;
  email: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  expirationDate: Date;
}
