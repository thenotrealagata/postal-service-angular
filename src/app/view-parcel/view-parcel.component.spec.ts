import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParcelComponent } from './view-parcel.component';

describe('ViewParcelComponent', () => {
  let component: ViewParcelComponent;
  let fixture: ComponentFixture<ViewParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewParcelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
