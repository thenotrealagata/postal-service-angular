import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../interfaces/http-protocol';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmailSource? = new BehaviorSubject('');
  currentEmail = this.userEmailSource?.asObservable();

  private currentAuth?: AuthenticationResponse;

  private loggedInSource = new BehaviorSubject(false);
  currentlyLoggedIn = this.loggedInSource.asObservable();

  constructor(private router: Router, private httpClientService: HttpClientService) {}

  isLoggedIn() {
    return this.currentlyLoggedIn;
  }

  setAuth(authResponse: AuthenticationResponse, email?: string) {
    this.currentAuth = authResponse;
    this.loggedInSource.next(true);

    if (email) {
      this.userEmailSource?.next(email);
    }
  }

  getAuthToken() {
    return this.currentAuth?.authToken;
  }

  logout() {
    this.currentAuth = undefined;
    this.loggedInSource.next(false);
    this.userEmailSource?.next('');

    this.router.navigate(['/login']);
  }

  async redeemRefreshToken(): Promise<void> {
    if (!this.currentAuth) {
      return Promise.reject();
    }

    this.httpClientService.refresh(JSON.stringify(this.currentAuth?.refreshToken)).subscribe({
      next: (authResponse) => {
        this.setAuth(authResponse);
        return Promise.resolve();
      },
      error: (error) => {
        return Promise.reject();
      }
    });
  }
}
