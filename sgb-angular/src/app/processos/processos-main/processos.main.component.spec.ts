import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosMainComponent } from './processos.main.component';

describe('ProcessosMainComponent', () => {
  let component: ProcessosMainComponent;
  let fixture: ComponentFixture<ProcessosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
