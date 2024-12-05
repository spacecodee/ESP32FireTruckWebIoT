import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireAnalyticsComponent } from './fire-analytics.component';

describe('FireAnalyticsComponent', () => {
  let component: FireAnalyticsComponent;
  let fixture: ComponentFixture<FireAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
