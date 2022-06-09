import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoModalComponent } from './sucesso-modal.component';

describe('SucessoModalComponent', () => {
  let component: SucessoModalComponent;
  let fixture: ComponentFixture<SucessoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
