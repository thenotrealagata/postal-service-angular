import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, delay, Observable, retry, tap, throwError, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const refreshJwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Intercept server response, and if it returns 401, attempt to refresh JWT token using refresh token
  // And retry failing request
  const authService = inject(AuthService);

  return (next(req)).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.handle401Error(req, next);
      } else {
        return throwError(() => error);
      }
    })
  );
};
