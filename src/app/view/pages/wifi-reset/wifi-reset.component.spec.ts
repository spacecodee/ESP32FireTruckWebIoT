import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiResetComponent } from './wifi-reset.component';

describe('WifiResetComponent', () => {
  let component: WifiResetComponent;
  let fixture: ComponentFixture<WifiResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WifiResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WifiResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
