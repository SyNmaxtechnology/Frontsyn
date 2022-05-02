import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProveedorComponent } from './reporte-proveedor.component';

describe('ReporteProveedorComponent', () => {
  let component: ReporteProveedorComponent;
  let fixture: ComponentFixture<ReporteProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
