import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaInfoComponent } from './rubrica-info.component';

describe('RubricaInfoComponent', () => {
  let component: RubricaInfoComponent;
  let fixture: ComponentFixture<RubricaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
