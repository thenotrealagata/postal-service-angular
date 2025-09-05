import { Component } from '@angular/core';
import { CreateParcelForm } from '../shared/interfaces/form.interfaces';
import {
  LocationResponse,
  LocationType,
  ParcelSize,
} from '../shared/interfaces/http-protocol';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../shared/services/form.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpClientService } from '../shared/services/http-client.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-create-parcel',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzToolTipModule,
  ],
  templateUrl: './create-parcel.component.html',
  styleUrl: './create-parcel.component.less',
})
export class CreateParcelComponent {
  parcelForm: FormGroup<CreateParcelForm>;

  locations: LocationResponse[] = [];
  locationsLoading = true;

  ParcelSize = ParcelSize;

  constructor(
    private formService: FormService,
    private httpClientService: HttpClientService,
  ) {
    this.parcelForm = formService.createParcelForm();

    this.httpClientService.getLocations(LocationType.AUTOMATE).subscribe({
      next: (locations) => {
        this.locations = locations;
        this.locationsLoading = false;
      },
    });
  }

  createParcel() {}
}
