import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../shared/services/http-client.service';
import { ParcelResponse, ParcelSize } from '../shared/interfaces/http-protocol';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CurryPipe } from '../shared/pipes/curry.pipe';

@Component({
  selector: 'app-view-parcel',
  imports: [NzIconModule, NgTemplateOutlet, NzStepsModule, DatePipe, CurryPipe],
  templateUrl: './view-parcel.component.html',
  styleUrl: './view-parcel.component.less',
})
export class ViewParcelComponent {
  parcel?: ParcelResponse;

  ParcelSize = ParcelSize

  constructor(
    activatedRoute: ActivatedRoute,
    private httpClientService: HttpClientService,
  ) {
    const resourceId = Number(activatedRoute.snapshot.paramMap.get('id'));

    httpClientService.getParcel(resourceId).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
      },
      error: (error) => {
        // TODO: if error, add unique ID received in e-mail
      },
    });
  }

  getParcelState(parcel: ParcelResponse): number {
    // 1 - Created; 2 - Placed; 3 - Arrived
    if (parcel.arrivedAt) {
      return 3;
    } else if (parcel.placedAt) {
      return 2;
    } else {
      return 1;
    }
  }
}
