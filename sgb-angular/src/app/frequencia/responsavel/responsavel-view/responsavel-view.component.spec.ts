import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelViewComponent } from './responsavel-view.component';

describe('ResponsavelViewComponent', () => {
  let component: ResponsavelViewComponent;
  let fixture: ComponentFixture<ResponsavelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsavelViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
