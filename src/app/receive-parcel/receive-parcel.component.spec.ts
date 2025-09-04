import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveParcelComponent } from './receive-parcel.component';

describe('ReceiveParcelComponent', () => {
  let component: ReceiveParcelComponent;
  let fixture: ComponentFixture<ReceiveParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveParcelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiveParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
