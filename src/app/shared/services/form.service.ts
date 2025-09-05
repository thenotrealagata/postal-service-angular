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

  authenticationForm(
    validators?: ValidatorFn[],
  ): FormGroup<AuthenticationForm> {
    const formValidators = [Validators.required, ...(validators ?? [])];
    return new FormGroup({
      username: new FormControl<string>('', {
        validators: formValidators,
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: formValidators,
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
          validators: [Validators.required],
          nonNullable: true,
        }),
      );
    }

    return form;
  }
}
