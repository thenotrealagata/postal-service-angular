import { Component } from '@angular/core';
import {
  CreateParcelForm,
  ParcelSize,
} from '../shared/interfaces/form.interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../shared/services/form.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-create-parcel',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
  ],
  templateUrl: './create-parcel.component.html',
  styleUrl: './create-parcel.component.less',
})
export class CreateParcelComponent {
  parcelForm: FormGroup<CreateParcelForm>;

  ParcelSize = ParcelSize;

  constructor(private formService: FormService) {
    this.parcelForm = formService.createParcelForm();
  }

  createParcel() {}
}
