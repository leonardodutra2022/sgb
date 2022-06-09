import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMoradiaTransporteFormComponent } from './subscription.moradia.transporte.form.component';

describe('SubscriptionMoradiaTransporteFormComponent', () => {
  let component: SubscriptionMoradiaTransporteFormComponent;
  let fixture: ComponentFixture<SubscriptionMoradiaTransporteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionMoradiaTransporteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMoradiaTransporteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
