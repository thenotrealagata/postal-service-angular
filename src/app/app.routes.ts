import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateParcelComponent } from './create-parcel/create-parcel.component';
import { ParcelListingComponent } from './parcel-listing/parcel-listing.component';
import { ViewParcelComponent } from './view-parcel/view-parcel.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'parcels/create', component: CreateParcelComponent },
  { path: 'parcels/view', component: ViewParcelComponent },
  {
    path: 'parcels/:id',
    component: ViewParcelComponent,
    canActivate: [authGuard],
  },
  {
    path: 'parcels',
    component: ParcelListingComponent,
    canActivate: [authGuard],
  },
];
