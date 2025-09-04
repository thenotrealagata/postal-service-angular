import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelListingComponent } from './parcel-listing.component';

describe('ParcelListingComponent', () => {
  let component: ParcelListingComponent;
  let fixture: ComponentFixture<ParcelListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParcelListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
