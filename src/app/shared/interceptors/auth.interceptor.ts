import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Append JWT token (if available) to request headers
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  if (token) {
    const authenticatedRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token}`),
    });
    return next(authenticatedRequest);
  }

  return next(req);
};
