import { Injectable } from '@angular/core';
import {
  AuthenticationRequest,
  LocationResponse,
  LocationType,
} from '../interfaces/http-protocol';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  login(request: AuthenticationRequest): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(`/api/login`, request);
  }

  register(request: AuthenticationRequest): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(`/api/register`, request);
  }

  getLocations(locationType?: LocationType): Observable<LocationResponse[]> {
    let queryString = '?';
    if (locationType !== undefined) {
      queryString += `locationType=${locationType}`;
    }
    console.log('query string', queryString);
    return this.http.get<LocationResponse[]>(`/api/locations${queryString}`);
  }
}
