import { Component } from '@angular/core';
import { HttpClientService } from '../shared/services/http-client.service';
import { ParcelResponse } from '../shared/interfaces/http-protocol';
import { NgTemplateOutlet } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-parcel-listing',
  imports: [NgTemplateOutlet, NzIconModule, NzCardModule, RouterLink],
  templateUrl: './parcel-listing.component.html',
  styleUrl: './parcel-listing.component.less',
})
export class ParcelListingComponent {
  createdParcels: ParcelResponse[] = [];
  receivedParcels: ParcelResponse[] = [];

  constructor(private httpClientService: HttpClientService) {
    this.getParcels();
  }

  getParcels() {
    this.httpClientService.getCreatedParcels().subscribe({
      next: (parcels) => {
        this.createdParcels = parcels;
      },
    });

    this.httpClientService.getReceivedParcels().subscribe({
      next: (parcels) => {
        this.receivedParcels = parcels;
      },
    });
  }
}
