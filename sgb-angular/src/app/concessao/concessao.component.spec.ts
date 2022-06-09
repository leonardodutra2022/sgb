import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessaoComponent } from './concessao.component';

describe('ConcessaoComponent', () => {
  let component: ConcessaoComponent;
  let fixture: ComponentFixture<ConcessaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
