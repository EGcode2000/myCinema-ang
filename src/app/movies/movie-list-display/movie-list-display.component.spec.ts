import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListDisplayComponent } from './movie-list-display.component';

describe('MovieListDisplayComponent', () => {
  let component: MovieListDisplayComponent;
  let fixture: ComponentFixture<MovieListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
