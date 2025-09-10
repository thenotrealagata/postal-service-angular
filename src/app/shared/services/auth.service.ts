import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../interfaces/http-protocol';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmailSource? = new BehaviorSubject('');
  currentEmail = this.userEmailSource?.asObservable();

  private currentAuth?: AuthenticationResponse;

  private loggedInSource = new BehaviorSubject(false);
  currentlyLoggedIn = this.loggedInSource.asObservable();

  constructor(private router: Router) {}

  isLoggedIn() {
    return this.currentlyLoggedIn;
  }

  setAuth(authResponse: AuthenticationResponse, email: string) {
    this.currentAuth = authResponse;
    this.userEmailSource?.next(email);
    this.loggedInSource.next(true);
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
}
