import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAjusteComponent } from './reporte-ajuste.component';

describe('ReporteAjusteComponent', () => {
  let component: ReporteAjusteComponent;
  let fixture: ComponentFixture<ReporteAjusteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAjusteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
