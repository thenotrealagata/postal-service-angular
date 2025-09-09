import { Component } from '@angular/core';
import { FormService } from '../shared/services/form.service';
import { HttpClientService } from '../shared/services/http-client.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationForm } from '../shared/interfaces/form.interfaces';
import { AuthenticationRequest } from '../shared/interfaces/http-protocol';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  authForm: FormGroup<AuthenticationForm>;
  login = true; // False when registering

  constructor(
    private formService: FormService,
    private httpClient: HttpClientService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.login = activatedRoute.snapshot.routeConfig?.path === 'login';
    this.authForm = formService.authenticationForm();
  }

  authenticate() {
    let hasError = false;
    Object.values(this.authForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
      hasError = hasError || control.invalid;
    });
    if (hasError) {
      this.nzMessageService.error('Please provide all the required fields.');
      return;
    }

    const request = this.authForm.value;
    if (this.login) {
      // Send authentication request
      this.httpClient.login(request as AuthenticationRequest).subscribe({
        next: (authResponse) => {
          this.authService.setAuth(authResponse);
          this.nzMessageService.success('Successful login');
          this.router.navigate(['/parcels']);
        },
        error: (err) => {
          this.nzMessageService.error('Login unsuccessful.');
          this.authForm.reset();
        },
      });
    } else {
      // Create new user
      this.httpClient.register(request as AuthenticationRequest).subscribe({
        next: () => {
          this.nzMessageService.success(
            'Successful registration. Log in with your credentials.',
          );
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.nzMessageService.error('Unsuccessful registration.');
        },
      });
    }
  }
}
