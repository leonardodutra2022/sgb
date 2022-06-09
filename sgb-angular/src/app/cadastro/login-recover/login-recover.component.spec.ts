import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecoverComponent } from './login-recover.component';

describe('LoginRecoverComponent', () => {
  let component: LoginRecoverComponent;
  let fixture: ComponentFixture<LoginRecoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
