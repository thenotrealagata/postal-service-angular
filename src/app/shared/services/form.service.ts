import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AuthenticationForm,
  CreateParcelForm,
} from '../interfaces/form.interfaces';
import { ParcelSize } from '../interfaces/http-protocol';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private authService: AuthService) {}

  authenticationForm(): FormGroup<AuthenticationForm> {
    return new FormGroup({
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        // TODO add validation rules: 1 lowercase, 1 uppercase, 1 digit, 1 non-alphanumeric
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });
  }

  createParcelForm(): FormGroup<CreateParcelForm> {
    const form: FormGroup<CreateParcelForm> = new FormGroup({
      size: new FormControl<ParcelSize>(ParcelSize.S, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      receiverEmail: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      startLocationId: new FormControl<number | undefined>(undefined, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      endLocationId: new FormControl<number | undefined>(undefined, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    if (!this.authService.isLoggedIn()) {
      form.addControl(
        'senderEmail',
        new FormControl('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
      );
    }

    return form;
  }
}
