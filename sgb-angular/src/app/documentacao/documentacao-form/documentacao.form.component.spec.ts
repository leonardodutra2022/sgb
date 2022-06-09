import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacaoFormComponent } from './documentacao.form.component';

describe('DocumentacaoFormComponent', () => {
  let component: DocumentacaoFormComponent;
  let fixture: ComponentFixture<DocumentacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
