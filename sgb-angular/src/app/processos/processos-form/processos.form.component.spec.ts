import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosFormComponent } from './processos.form.component';

describe('ProcessosFormComponent', () => {
  let component: ProcessosFormComponent;
  let fixture: ComponentFixture<ProcessosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
