import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionRecibosCreditoComponent } from './aplicacion-recibos-credito.component';

describe('AplicacionRecibosCreditoComponent', () => {
  let component: AplicacionRecibosCreditoComponent;
  let fixture: ComponentFixture<AplicacionRecibosCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacionRecibosCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacionRecibosCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
