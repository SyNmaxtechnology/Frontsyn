import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D151ventasComponent } from './d151ventas.component';

describe('D151ventasComponent', () => {
  let component: D151ventasComponent;
  let fixture: ComponentFixture<D151ventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D151ventasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D151ventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
