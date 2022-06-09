import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDocumentacaoComponent } from './subscription.documentacao.component';

describe('SubscriptionDocumentacaoComponent', () => {
  let component: SubscriptionDocumentacaoComponent;
  let fixture: ComponentFixture<SubscriptionDocumentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionDocumentacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDocumentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
