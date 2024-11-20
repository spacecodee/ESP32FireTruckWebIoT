import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckStatusComponent } from './truck-status.component';

describe('TruckStatusComponent', () => {
  let component: TruckStatusComponent;
  let fixture: ComponentFixture<TruckStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TruckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
