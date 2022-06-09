import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosDetailComponent } from './processos.detail.component';

describe('Processos.DetailComponent', () => {
  let component: ProcessosDetailComponent;
  let fixture: ComponentFixture<ProcessosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
