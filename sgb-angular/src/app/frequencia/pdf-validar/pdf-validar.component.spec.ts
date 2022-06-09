import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfValidarComponent } from './pdf-validar.component';

describe('PdfValidarComponent', () => {
  let component: PdfValidarComponent;
  let fixture: ComponentFixture<PdfValidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfValidarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
