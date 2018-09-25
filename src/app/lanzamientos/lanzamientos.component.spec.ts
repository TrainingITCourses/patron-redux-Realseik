import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanzamientosComponent } from './lanzamientos.component';

describe('LanzamientosComponent', () => {
  let component: LanzamientosComponent;
  let fixture: ComponentFixture<LanzamientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanzamientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanzamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
