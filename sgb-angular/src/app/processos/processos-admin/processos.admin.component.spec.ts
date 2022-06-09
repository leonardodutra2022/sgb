import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosAdminComponent } from './processos.admin.component';

describe('ProcessosAdminComponent', () => {
  let component: ProcessosAdminComponent;
  let fixture: ComponentFixture<ProcessosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
