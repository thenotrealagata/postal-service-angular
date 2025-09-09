export type AuthenticationRequest = {
  email: string;
  password: string;
};

export type CreateUserResponse = {
  id: string;
  email: string;
};

export type AuthenticationResponse = {
  userId: string;
  authToken: string;
  refreshToken: string;
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
  XS = 0,
  S = 1,
  M = 2,
  L = 3,
  XL = 4,
}

export type ParcelRequest = {
  parcelSize: ParcelSize;
  senderEmail?: string;
  receiverEmail: string;
  startLocationId: number;
  endLocationId: number;
};

export type ParcelResponse = {
  id: number;
  createdAt: Date;
  placedAt?: Date;
  arrivedAt?: Date;
  isFulfilled: boolean;
  size: ParcelSize;
  senderEmail: string;
  receiverEmail: string;
  startLocation: LocationResponse;
  endLocation: LocationResponse;
  currentLocation?: LocationResponse;
};
