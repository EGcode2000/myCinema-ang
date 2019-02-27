import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNextComponent } from './show-next.component';

describe('ShowNextComponent', () => {
  let component: ShowNextComponent;
  let fixture: ComponentFixture<ShowNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
