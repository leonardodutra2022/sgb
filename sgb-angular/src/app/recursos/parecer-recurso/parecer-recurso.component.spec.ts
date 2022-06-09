import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParecerRecursoComponent } from './parecer-recurso.component';

describe('ParecerRecursoComponent', () => {
  let component: ParecerRecursoComponent;
  let fixture: ComponentFixture<ParecerRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParecerRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParecerRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
