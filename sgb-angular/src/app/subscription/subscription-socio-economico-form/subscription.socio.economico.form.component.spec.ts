import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSocioEconomicoFormComponent } from './subscription.socio.economico.form.component';

describe('SubscriptionSocioEconomicoFormComponent', () => {
  let component: SubscriptionSocioEconomicoFormComponent;
  let fixture: ComponentFixture<SubscriptionSocioEconomicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionSocioEconomicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSocioEconomicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
