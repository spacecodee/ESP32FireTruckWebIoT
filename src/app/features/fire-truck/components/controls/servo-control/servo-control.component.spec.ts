import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServoControlComponent } from './servo-control.component';

describe('ServoControlComponent', () => {
  let component: ServoControlComponent;
  let fixture: ComponentFixture<ServoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServoControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
