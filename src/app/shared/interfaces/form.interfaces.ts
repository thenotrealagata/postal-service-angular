import { FormControl } from '@angular/forms';
import { ParcelSize } from './http-protocol';

export interface AuthenticationForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface CreateParcelForm {
  size: FormControl<ParcelSize>;
  senderEmail?: FormControl<string>;
  receiverEmail: FormControl<string>;
  startLocationId: FormControl<number | undefined>;
  endLocationId: FormControl<number | undefined>;
}

export interface AccessCodeForm {
  email: FormControl<string>;
  accessCode: FormControl<string>;
}
