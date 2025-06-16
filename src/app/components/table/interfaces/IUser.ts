type Email = `${string}@${string}.${string}`;

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: Email | string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode?: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
