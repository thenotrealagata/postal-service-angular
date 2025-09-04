import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail?: string;
  authToken?: string;
  refreshToken?: string;

  constructor() {}

  isLoggedIn(): boolean {
    return !!this.userEmail;
  }

  setUser(email: string) {
    this.userEmail = email;
  }

  getEmail(): string | undefined {
    return this.userEmail;
  }
}
