import { Injectable } from '@angular/core';
import { AuthenticationResponse } from '../interfaces/http-protocol';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientService } from './http-client.service';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEmailSource? = new BehaviorSubject('');
  currentEmail = this.userEmailSource?.asObservable();

  private currentAuth?: AuthenticationResponse;
  private refreshTokenSubject = new BehaviorSubject<AuthenticationResponse | null>(null);
  private isRefreshing = false;

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

  handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.redeemRefreshToken().pipe(
        switchMap((token: AuthenticationResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next(this.addTokenHeader(request, token.authToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => {
          return next(this.addTokenHeader(request, token.authToken));
        })
      );
    }
  }

  addTokenHeader(request: HttpRequest<unknown>, authToken: string): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  redeemRefreshToken(): Observable<AuthenticationResponse> {
    if (!this.currentAuth) {
      throwError(() => new Error('User must be authenticated to perform this action'));
    }

    return this.httpClientService.refresh(JSON.stringify(this.currentAuth?.refreshToken));
  }
}
