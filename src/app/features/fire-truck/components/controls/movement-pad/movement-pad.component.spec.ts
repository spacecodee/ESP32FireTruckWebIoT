import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementPadComponent } from './movement-pad.component';

describe('MovementPadComponent', () => {
  let component: MovementPadComponent;
  let fixture: ComponentFixture<MovementPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementPadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovementPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
