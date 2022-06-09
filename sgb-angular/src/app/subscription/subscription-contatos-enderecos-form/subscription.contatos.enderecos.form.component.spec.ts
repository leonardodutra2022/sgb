import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionContatosEnderecosFormComponent } from './subscription.contatos.enderecos.form.component';

describe('SubscriptionContatosEnderecosFormComponent', () => {
  let component: SubscriptionContatosEnderecosFormComponent;
  let fixture: ComponentFixture<SubscriptionContatosEnderecosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionContatosEnderecosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionContatosEnderecosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
