import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D151comprasComponent } from './d151compras.component';

describe('D151comprasComponent', () => {
  let component: D151comprasComponent;
  let fixture: ComponentFixture<D151comprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D151comprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D151comprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
