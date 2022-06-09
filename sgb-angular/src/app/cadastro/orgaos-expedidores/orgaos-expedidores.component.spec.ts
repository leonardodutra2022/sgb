import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaosExpedidoresComponent } from './orgaos-expedidores.component';

describe('OrgaosExpedidoresComponent', () => {
  let component: OrgaosExpedidoresComponent;
  let fixture: ComponentFixture<OrgaosExpedidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgaosExpedidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgaosExpedidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
