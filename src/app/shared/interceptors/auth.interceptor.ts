import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  let subscription;
  if (token) {
    const authenticatedRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token}`),
    });
    subscription = next(authenticatedRequest);
  }

  return (subscription ?? next(req)).pipe(
    tap({
      error: (err) => {
        const status = err.status;

        // TODO
        if (status == 401) {
        }
      },
    }),
  );
};
