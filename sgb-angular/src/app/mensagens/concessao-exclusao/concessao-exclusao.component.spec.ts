import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessaoExclusaoComponent } from './concessao-exclusao.component';

describe('ConcessaoExclusaoComponent', () => {
  let component: ConcessaoExclusaoComponent;
  let fixture: ComponentFixture<ConcessaoExclusaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcessaoExclusaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcessaoExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
