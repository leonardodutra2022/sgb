import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOutrosAuxiliosFormComponent } from './subscription.outros.auxilios.form.component';

describe('SubscriptionOutrosAuxiliosFormComponent', () => {
  let component: SubscriptionOutrosAuxiliosFormComponent;
  let fixture: ComponentFixture<SubscriptionOutrosAuxiliosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionOutrosAuxiliosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionOutrosAuxiliosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
