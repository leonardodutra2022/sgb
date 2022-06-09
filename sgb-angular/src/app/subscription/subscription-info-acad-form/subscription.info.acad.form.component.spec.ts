import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionInfoAcadFormComponent } from './subscription.info.acad.form.component';

describe('SubscriptionInfoAcadFormComponent', () => {
  let component: SubscriptionInfoAcadFormComponent;
  let fixture: ComponentFixture<SubscriptionInfoAcadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionInfoAcadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionInfoAcadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
