import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoDesatualizadaComponent } from './versao-desatualizada.component';

describe('VersaoDesatualizadaComponent', () => {
  let component: VersaoDesatualizadaComponent;
  let fixture: ComponentFixture<VersaoDesatualizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoDesatualizadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersaoDesatualizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
