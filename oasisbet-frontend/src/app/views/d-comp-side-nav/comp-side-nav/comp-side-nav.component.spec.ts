import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSideNavComponent } from './comp-side-nav.component';

describe('CompSideNavComponent', () => {
  let component: CompSideNavComponent;
  let fixture: ComponentFixture<CompSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
