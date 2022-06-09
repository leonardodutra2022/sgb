import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSucessModalComponent } from './upload-sucess-modal.component';

describe('UploadSucessModalComponent', () => {
  let component: UploadSucessModalComponent;
  let fixture: ComponentFixture<UploadSucessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSucessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSucessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
