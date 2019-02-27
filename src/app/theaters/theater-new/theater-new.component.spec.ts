import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterNewComponent } from './theater-new.component';

describe('TheaterNewComponent', () => {
  let component: TheaterNewComponent;
  let fixture: ComponentFixture<TheaterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheaterNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
