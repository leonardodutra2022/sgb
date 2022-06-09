import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionStepVerticalComponent } from './subscription.step.vertical.component';

describe('SubscriptionFormComponent', () => {
  let component: SubscriptionStepVerticalComponent;
  let fixture: ComponentFixture<SubscriptionStepVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionStepVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionStepVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
