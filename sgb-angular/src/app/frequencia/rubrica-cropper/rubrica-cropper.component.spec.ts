import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaCropperComponent } from './rubrica-cropper.component';

describe('RubricaCropperComponent', () => {
  let component: RubricaCropperComponent;
  let fixture: ComponentFixture<RubricaCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaCropperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
