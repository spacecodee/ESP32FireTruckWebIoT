import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlameSensorsComponent } from './flame-sensors.component';

describe('FlameSensorsComponent', () => {
  let component: FlameSensorsComponent;
  let fixture: ComponentFixture<FlameSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlameSensorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlameSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
