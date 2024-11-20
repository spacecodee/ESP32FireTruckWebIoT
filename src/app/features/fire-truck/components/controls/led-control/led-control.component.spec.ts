import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControlComponent } from './led-control.component';

describe('LedControlComponent', () => {
  let component: LedControlComponent;
  let fixture: ComponentFixture<LedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
