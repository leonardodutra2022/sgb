import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeRubricaComponent } from './informe-rubrica.component';

describe('InformeRubricaComponent', () => {
  let component: InformeRubricaComponent;
  let fixture: ComponentFixture<InformeRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
