import { FormControl } from '@angular/forms';

export interface AuthenticationForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export enum ParcelSize {
  XS,
  S,
  M,
  L,
  XL,
}

export interface CreateParcelForm {
  size: FormControl<ParcelSize>;
  senderEmail?: FormControl<string>;
  receiverEmail: FormControl<string>;
  endLocationId: FormControl<number | undefined>;
}
