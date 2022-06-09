import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatriculaModalComponent } from './update-matricula-modal.component';

describe('UpdateMatriculaModalComponent', () => {
  let component: UpdateMatriculaModalComponent;
  let fixture: ComponentFixture<UpdateMatriculaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMatriculaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMatriculaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
