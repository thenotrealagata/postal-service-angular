import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../interfaces/http-protocol';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentAuth?: AuthenticationResponse;

  private loggedInSource = new BehaviorSubject(false);
  currentlyLoggedIn = this.loggedInSource.asObservable();

  constructor() {}

  isLoggedIn() {
    return this.currentlyLoggedIn;
  }

  setAuth(authResponse: AuthenticationResponse) {
    this.currentAuth = authResponse;
    this.loggedInSource.next(true);
  }

  getAuthToken() {
    return this.currentAuth?.authToken;
  }
}
