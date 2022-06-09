import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDadosPessoaisFormComponent } from './subscription.dados.pessoais.form.component';

describe('SubscriptionDadosPessoaisFormComponent', () => {
  let component: SubscriptionDadosPessoaisFormComponent;
  let fixture: ComponentFixture<SubscriptionDadosPessoaisFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionDadosPessoaisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDadosPessoaisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
