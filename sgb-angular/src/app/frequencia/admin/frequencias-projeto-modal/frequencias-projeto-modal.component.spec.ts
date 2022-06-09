import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequenciasProjetoModalComponent } from './frequencias-projeto-modal.component';

describe('FrequenciasProjetoModalComponent', () => {
  let component: FrequenciasProjetoModalComponent;
  let fixture: ComponentFixture<FrequenciasProjetoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequenciasProjetoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequenciasProjetoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
