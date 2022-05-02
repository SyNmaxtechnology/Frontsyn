import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D151ventasresumidoComponent } from './d151ventasresumido.component';

describe('D151ventasresumidoComponent', () => {
  let component: D151ventasresumidoComponent;
  let fixture: ComponentFixture<D151ventasresumidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D151ventasresumidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D151ventasresumidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
