import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCpfModalComponent } from './update.cpf.modal.component';

describe('UpdateCpfModalComponent', () => {
  let component: UpdateCpfModalComponent;
  let fixture: ComponentFixture<UpdateCpfModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCpfModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCpfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
