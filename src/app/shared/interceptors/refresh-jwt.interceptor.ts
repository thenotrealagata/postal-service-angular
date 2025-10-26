import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const refreshJwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Intercept server response, and if it returns 401, attempt to refresh JWT token using refresh token
  // And retry failing request
  const authService = inject(AuthService);

  return (next(req)).pipe(
    tap({
      error: (err) => {
        const status = err.status;

        if (status == 401) {
          // Server returns 401 when a JWT token has expired
          // In this case, try to redeem refresh token and retry request
          authService.redeemRefreshToken().then(() => {
            // Refresh token successfully redeemed, retry request
            console.log('retry request', req);
          }).catch((error) => {
            // Refresh token couldn't be redeemed, user must log in again
            authService.logout();
          });
        } else if (status == 403) {
          // Unauthorized user, show error
        }
      },
    }),
  );
};
