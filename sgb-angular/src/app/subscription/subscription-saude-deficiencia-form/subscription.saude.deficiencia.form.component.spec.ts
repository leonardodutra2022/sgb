import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSaudeDeficienciaFormComponent } from './subscription.saude.deficiencia.form.component';

describe('SubscriptionSaudeDeficienciaFormComponent', () => {
  let component: SubscriptionSaudeDeficienciaFormComponent;
  let fixture: ComponentFixture<SubscriptionSaudeDeficienciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionSaudeDeficienciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSaudeDeficienciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
