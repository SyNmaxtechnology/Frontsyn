import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFormaPagoComponent } from './reporte-forma-pago.component';

describe('ReporteFormaPagoComponent', () => {
  let component: ReporteFormaPagoComponent;
  let fixture: ComponentFixture<ReporteFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
