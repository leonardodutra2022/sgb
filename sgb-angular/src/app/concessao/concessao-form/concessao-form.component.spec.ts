import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessaoFormComponent } from './concessao-form.component';

describe('ConcessaoFormComponent', () => {
  let component: ConcessaoFormComponent;
  let fixture: ComponentFixture<ConcessaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
