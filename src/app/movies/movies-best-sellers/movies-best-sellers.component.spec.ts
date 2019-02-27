import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesBestSellersComponent } from './movies-best-sellers.component';

describe('MoviesBestSellersComponent', () => {
  let component: MoviesBestSellersComponent;
  let fixture: ComponentFixture<MoviesBestSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesBestSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesBestSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
