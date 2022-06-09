import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeUploadComponent } from './informe-upload.component';

describe('InformeUploadComponent', () => {
  let component: InformeUploadComponent;
  let fixture: ComponentFixture<InformeUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
