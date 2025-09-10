import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../shared/services/http-client.service';
import { ParcelResponse, ParcelSize } from '../shared/interfaces/http-protocol';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CurryPipe } from '../shared/pipes/curry.pipe';
import { AuthService } from '../shared/services/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AccessCodeForm } from '../shared/interfaces/form.interfaces';
import { FormService } from '../shared/services/form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-view-parcel',
  imports: [
    NzIconModule,
    NgTemplateOutlet,
    NzStepsModule,
    DatePipe,
    CurryPipe,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  templateUrl: './view-parcel.component.html',
  styleUrl: './view-parcel.component.less',
})
export class ViewParcelComponent {
  userEmail?: string;
  parcel?: ParcelResponse;

  ParcelSize = ParcelSize;

  isAccessCodeModalVisible = false;
  getByAccessCodeLoading = false;
  accessCodeForm?: FormGroup<AccessCodeForm>;

  constructor(
    activatedRoute: ActivatedRoute,
    private httpClientService: HttpClientService,
    private authService: AuthService,
    private nzMessageService: NzMessageService,
    private formService: FormService,
    private router: Router,
  ) {
    if (activatedRoute.snapshot.paramMap.has('id')) {
      const resourceId = Number(activatedRoute.snapshot.paramMap.get('id'));

      httpClientService.getParcel(resourceId).subscribe({
        next: (parcel) => {
          this.parcel = parcel;
        },
        error: (error) => {
          // TODO: if user doesn't have the rights to the parcel, show error message and redirect
        },
      });
    } else {
      this.isAccessCodeModalVisible = true;
      this.accessCodeForm = this.formService.accessCodeForm();
    }

    authService.currentEmail?.subscribe({
      next: (email) => {
        this.userEmail = email;
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

  receive() {
    if (!this.parcel) return;

    this.httpClientService.receiveParcel(this.parcel.id).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.nzMessageService.success('Parcel received.');
      },
    });
  }

  post() {
    if (!this.parcel) return;

    this.httpClientService.postParcel(this.parcel.id).subscribe({
      next: (parcel) => {
        this.parcel = parcel;
        this.nzMessageService.success('Parcel dispatched.');
      },
    });
  }

  closeAccessCodeModal() {
    this.isAccessCodeModalVisible = false;
  }

  submitAccessCode() {
    this.getByAccessCodeLoading = true;
    this.httpClientService
      .getParcelWithAccessCode(
        this.accessCodeForm?.controls.email.value!,
        this.accessCodeForm?.controls.accessCode.value!,
      )
      .subscribe({
        next: (parcel) => {
          this.parcel = parcel;
          this.getByAccessCodeLoading = false;
          this.isAccessCodeModalVisible = false;
        },
        error: (error) => {
          this.nzMessageService.error(
            'There is no parcel with the given access code and e-mail address in the database!',
          );
          this.router.navigate(['/']);
        },
      });
  }
}
