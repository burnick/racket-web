import { Dispatch, SetStateAction } from 'react';
import { UserCredential } from 'firebase/auth';

enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

type ID = string | number | undefined;

export interface CurrentUserProps {
  user: UserCredential;
}

export interface UserProps {
  uid: string;
  displayName: string;
  email: string;
  nickname: string;
  role?: Roles;
  updated_at?: EpochTimeStamp;
  created_at?: EpochTimeStamp;
}

export interface JobProps {
  id?: ID;
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
  imgUrl: string;
}

export type ButtonTypes =
  | 'link'
  | 'text'
  | 'default'
  | 'ghost'
  | 'primary'
  | 'dashed'
  | undefined;

export interface SignUpProps {
  email: string;
  password: string;
}

export type LatLngTuple = [number, number];

export interface SetMarkerProps {
  setMarkers?: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
      address: string;
    }>
  >;
}
export interface MapComponentProps extends SetMarkerProps {
  radius: number;
  marker: {
    lat: number;
    lng: number;
    address: string;
  };
  multipleMarkers?: {
    lat: number;
    lng: number;
    address: string;
  }[];
  // setMarkers?: React.Dispatch<
  //   React.SetStateAction<{
  //     uid: string;
  //     lat: number;
  //     lng: number;
  //     radius: number;
  //     address?: string;
  //   }>
  // >;
}
export interface UserProps {
  uid: string;
  displayName: string;
  updated_at?: EpochTimeStamp;
  created_at?: EpochTimeStamp;
}

export interface FBUserProps {
  uid: string;
  displayName: string;
}

export interface LocationProps {
  uid?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  address?: string;
  updated_at?: EpochTimeStamp;
  created_at?: EpochTimeStamp;
}

export interface CoordinatesProps {
  lat: number;
  lng: number;
  address?: string;
}

export interface CategoriesProps {
  id: number;
  name: string;
}

export enum JobTypes {
  FULLTIME = 'Full time',
  PARTTIME = 'Part time',
}

// export interface JobProps {
//   id: number;
//   uid: string;
//   title: string;
//   employmentType: string;
//   category: string;
//   description: string;
//   salary: number;
//   link: string;
//   email: string;
//   address: string;
//   phone: string;
//   lat: number;
//   lng: number;
//   expirationDate: Date;
// }

export type MessageNotificationContextType = {
  messageText: string;
  setMessageText: Dispatch<SetStateAction<string>>;
};

export enum ManilaLatLong {
  lat = 14.5995,
  lng = 120.9842,
  address = 'Metro Manila',
  radius = 30000,
}

export interface ChatUsers {
  id: string;
  name: string;
}

export interface Messages {
  name: string;
  userId: string;
  text: string;
}

export interface EmailProps {
  email: string;
  token: string;
}
