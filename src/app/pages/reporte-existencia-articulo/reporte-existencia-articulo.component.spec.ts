import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExistenciaArticuloComponent } from './reporte-existencia-articulo.component';

describe('ReporteExistenciaArticuloComponent', () => {
  let component: ReporteExistenciaArticuloComponent;
  let fixture: ComponentFixture<ReporteExistenciaArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteExistenciaArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteExistenciaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
