import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasCreditoCanceladasComponent } from './facturas-credito-canceladas.component';

describe('FacturasCreditoCanceladasComponent', () => {
  let component: FacturasCreditoCanceladasComponent;
  let fixture: ComponentFixture<FacturasCreditoCanceladasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasCreditoCanceladasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasCreditoCanceladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
