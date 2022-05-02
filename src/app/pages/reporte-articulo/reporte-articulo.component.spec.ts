import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteArticuloComponent } from './reporte-articulo.component';

describe('ReporteArticuloComponent', () => {
  let component: ReporteArticuloComponent;
  let fixture: ComponentFixture<ReporteArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
