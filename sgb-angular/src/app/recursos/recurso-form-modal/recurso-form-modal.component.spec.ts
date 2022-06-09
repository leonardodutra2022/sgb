import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoFormModalComponent } from './recurso-form-modal.component';

describe('RecursoFormModalComponent', () => {
  let component: RecursoFormModalComponent;
  let fixture: ComponentFixture<RecursoFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
