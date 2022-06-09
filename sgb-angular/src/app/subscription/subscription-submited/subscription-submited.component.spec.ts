import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSubmitedComponent } from './subscription-submited.component';

describe('SubscriptionSubmitedComponent', () => {
  let component: SubscriptionSubmitedComponent;
  let fixture: ComponentFixture<SubscriptionSubmitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionSubmitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSubmitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
