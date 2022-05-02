import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmisoresComponent } from './lista-emisores.component';

describe('ListaEmisoresComponent', () => {
  let component: ListaEmisoresComponent;
  let fixture: ComponentFixture<ListaEmisoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEmisoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
