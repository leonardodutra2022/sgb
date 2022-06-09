import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosPublicosComponent } from './processos.publicos.component';

describe('ProcessosPublicosComponent', () => {
  let component: ProcessosPublicosComponent;
  let fixture: ComponentFixture<ProcessosPublicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosPublicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
