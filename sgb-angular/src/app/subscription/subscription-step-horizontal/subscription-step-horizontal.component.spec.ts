import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionStepHorizontalComponent } from './subscription-step-horizontal.component';

describe('SubscriptionStepHorizontalComponent', () => {
  let component: SubscriptionStepHorizontalComponent;
  let fixture: ComponentFixture<SubscriptionStepHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionStepHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionStepHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
