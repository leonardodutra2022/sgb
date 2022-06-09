import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionComissaoComponent } from './subscription-comissao.component';

describe('SubscriptionComissaoComponent', () => {
  let component: SubscriptionComissaoComponent;
  let fixture: ComponentFixture<SubscriptionComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
