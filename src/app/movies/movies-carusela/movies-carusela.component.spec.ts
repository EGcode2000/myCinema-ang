import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCaruselaComponent } from './movies-carusela.component';

describe('MoviesCaruselaComponent', () => {
  let component: MoviesCaruselaComponent;
  let fixture: ComponentFixture<MoviesCaruselaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesCaruselaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCaruselaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
