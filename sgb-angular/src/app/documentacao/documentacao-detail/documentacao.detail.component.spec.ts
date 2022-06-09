import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacaoDetailComponent } from './documentacao.detail.component';

describe('DocumentacaoDetailComponent', () => {
  let component: DocumentacaoDetailComponent;
  let fixture: ComponentFixture<DocumentacaoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacaoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
