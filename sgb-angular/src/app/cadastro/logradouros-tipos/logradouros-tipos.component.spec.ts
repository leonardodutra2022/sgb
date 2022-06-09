import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogradourosTiposComponent } from './logradouros-tipos.component';

describe('LogradourosTiposComponent', () => {
  let component: LogradourosTiposComponent;
  let fixture: ComponentFixture<LogradourosTiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogradourosTiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogradourosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
