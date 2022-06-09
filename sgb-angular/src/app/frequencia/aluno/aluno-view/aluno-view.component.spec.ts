import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoViewComponent } from './aluno-view.component';

describe('AlunoViewComponent', () => {
  let component: AlunoViewComponent;
  let fixture: ComponentFixture<AlunoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
