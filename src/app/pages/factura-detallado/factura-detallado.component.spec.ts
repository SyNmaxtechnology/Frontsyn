import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDetalladoComponent } from './factura-detallado.component';

describe('FacturaDetalladoComponent', () => {
  let component: FacturaDetalladoComponent;
  let fixture: ComponentFixture<FacturaDetalladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaDetalladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
