import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateParcelComponent } from './create-parcel/create-parcel.component';
import { ParcelListingComponent } from './parcel-listing/parcel-listing.component';
import { ViewParcelComponent } from './view-parcel/view-parcel.component';
import { ReceiveParcelComponent } from './receive-parcel/receive-parcel.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'parcels/create', component: CreateParcelComponent },
  { path: 'parcels/details', component: ViewParcelComponent },
  { path: 'parcels/receive', component: ReceiveParcelComponent },
  { path: 'parcels', component: ParcelListingComponent },
];
