import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../interfaces/http-protocol';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  baseUrl = 'https://localhost:7244';

  constructor(private http: HttpClient) {}

  login(request: AuthenticationRequest): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(
      `${this.baseUrl}/login`,
      request,
    );
  }

  register(request: AuthenticationRequest): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(
      `${this.baseUrl}/register`,
      request,
    );
  }
}
