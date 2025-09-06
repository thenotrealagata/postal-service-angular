import { Injectable } from '@angular/core';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  LocationResponse,
  LocationType,
  ParcelRequest,
  ParcelResponse,
} from '../interfaces/http-protocol';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  // Authentication and authorization
  register(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`/api/register`, request);
  }

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`/api/login`, request);
  }

  refresh(refreshToken: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>('/api/refresh', refreshToken);
  }

  // Locations
  getLocations(locationType?: LocationType): Observable<LocationResponse[]> {
    let queryString = '?';
    if (locationType !== undefined) {
      queryString += `locationType=${locationType}`;
    }
    return this.http.get<LocationResponse[]>(`/api/locations${queryString}`);
  }

  // Parcels
  createParcel(parcel: ParcelRequest): Observable<ParcelResponse> {
    return this.http.post<ParcelResponse>(`/api/parcels`, parcel);
  }
}
