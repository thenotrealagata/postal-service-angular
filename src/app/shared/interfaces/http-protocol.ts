export type AuthenticationRequest = {
  username: string;
  password: string;
};

export enum LocationType {
  AUTOMATE = 0,
  WAREHOUSE = 1,
}

export type LocationResponse = {
  id: number;
  address: string;
  capacity: number;
  locationType: LocationType;
};

export enum ParcelSize {
  XS,
  S,
  M,
  L,
  XL,
}
