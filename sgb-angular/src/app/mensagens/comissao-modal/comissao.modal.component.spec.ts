import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissaoModalComponent } from './comissao.modal.component';

describe('ComissaoModalComponent', () => {
  let component: ComissaoModalComponent;
  let fixture: ComponentFixture<ComissaoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissaoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
