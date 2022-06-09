import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeInscricaoComponent } from './informe-inscricao.component';

describe('InformeInscricaoComponent', () => {
  let component: InformeInscricaoComponent;
  let fixture: ComponentFixture<InformeInscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeInscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
