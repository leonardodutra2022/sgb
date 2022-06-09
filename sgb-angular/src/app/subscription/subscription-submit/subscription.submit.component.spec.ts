import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSubmitComponent } from './subscription.submit.component';

describe('SubscriptionSubmitComponent', () => {
  let component: SubscriptionSubmitComponent;
  let fixture: ComponentFixture<SubscriptionSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
