import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadesUfComponent } from './cidades-uf.component';

describe('CidadesUfComponent', () => {
  let component: CidadesUfComponent;
  let fixture: ComponentFixture<CidadesUfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidadesUfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadesUfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
