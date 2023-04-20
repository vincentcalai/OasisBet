import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSideNavComponent } from './results-side-nav.component';

describe('ResultsSideNavComponent', () => {
  let component: ResultsSideNavComponent;
  let fixture: ComponentFixture<ResultsSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
