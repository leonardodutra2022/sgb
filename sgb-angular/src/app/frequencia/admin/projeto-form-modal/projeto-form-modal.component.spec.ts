import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoFormModalComponent } from './projeto-form-modal.component';

describe('ProjetoFormModalComponent', () => {
  let component: ProjetoFormModalComponent;
  let fixture: ComponentFixture<ProjetoFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
