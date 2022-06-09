import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionInfoFinanceiraFormComponent } from './subscription.info.financeira.form.component';

describe('SubscriptionInfoFinanceiraFormComponent', () => {
  let component: SubscriptionInfoFinanceiraFormComponent;
  let fixture: ComponentFixture<SubscriptionInfoFinanceiraFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionInfoFinanceiraFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionInfoFinanceiraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
