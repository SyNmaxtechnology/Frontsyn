import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoautorizadoComponent } from './noautorizado.component';

describe('NoautorizadoComponent', () => {
  let component: NoautorizadoComponent;
  let fixture: ComponentFixture<NoautorizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoautorizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoautorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
