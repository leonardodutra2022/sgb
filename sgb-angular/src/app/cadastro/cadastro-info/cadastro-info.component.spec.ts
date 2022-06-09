import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroInfoComponent } from './cadastro-info.component';

describe('CadastroInfoComponent', () => {
  let component: CadastroInfoComponent;
  let fixture: ComponentFixture<CadastroInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
