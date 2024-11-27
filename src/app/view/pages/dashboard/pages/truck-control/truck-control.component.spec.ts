import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckControlComponent } from './truck-control.component';

describe('TruckControlComponent', () => {
  let component: TruckControlComponent;
  let fixture: ComponentFixture<TruckControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TruckControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
