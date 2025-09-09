import { Component } from '@angular/core';
import { CreateParcelForm } from '../shared/interfaces/form.interfaces';
import {
  LocationResponse,
  LocationType,
  ParcelRequest,
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
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

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
    private nzMessageService: NzMessageService,
    private router: Router,
  ) {
    this.parcelForm = formService.createParcelForm();

    this.httpClientService.getLocations(LocationType.AUTOMATE).subscribe({
      next: (locations) => {
        this.locations = locations;
        this.locationsLoading = false;
      },
    });
  }

  createParcel() {
    // Validate form
    Object.values(this.parcelForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });

    // If there are no errors, create parcel
    if (this.parcelForm.valid) {
      this.httpClientService
        .createParcel(this.parcelForm.value as ParcelRequest)
        .subscribe({
          next: (parcelResponse) => {
            this.nzMessageService.success('Parcel created successfully.');
            this.router.navigate([`/parcels/${parcelResponse.id}`]);
          },
          error: (error) => {
            this.nzMessageService.error(
              "Parcel couldn't be created. Please try again.",
            );
          },
        });
    }
  }
}
