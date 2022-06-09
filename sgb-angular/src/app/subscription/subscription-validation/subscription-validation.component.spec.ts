import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionValidationComponent } from './subscription-validation.component';

describe('SubscriptionValidationComponent', () => {
  let component: SubscriptionValidationComponent;
  let fixture: ComponentFixture<SubscriptionValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
