import { FormControl } from '@angular/forms';
import { ParcelSize } from './http-protocol';

export interface AuthenticationForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface CreateParcelForm {
  size: FormControl<ParcelSize>;
  senderEmail?: FormControl<string>;
  receiverEmail: FormControl<string>;
  endLocationId: FormControl<number | undefined>;
}
