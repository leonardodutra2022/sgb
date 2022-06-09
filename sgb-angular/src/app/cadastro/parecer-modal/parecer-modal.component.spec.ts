import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParecerModalComponent } from './parecer-modal.component';

describe('ParecerModalComponent', () => {
  let component: ParecerModalComponent;
  let fixture: ComponentFixture<ParecerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParecerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParecerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
