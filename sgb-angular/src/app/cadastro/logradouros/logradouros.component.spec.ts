import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogradourosComponent } from './logradouros.component';

describe('LogradourosComponent', () => {
  let component: LogradourosComponent;
  let fixture: ComponentFixture<LogradourosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogradourosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogradourosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
