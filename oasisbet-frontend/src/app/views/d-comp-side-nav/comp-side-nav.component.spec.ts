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

  it('when select competition type, should emit the correct menu', () => {
    const compTypeSelect = component.sharedVar.COMP_HEADER_EPL;
    let emittedMenuSelect: string;

    component.onSelectCompType.subscribe((compType: string) => {
      emittedMenuSelect = compType;
    });

    component.selectCompType(compTypeSelect);

    expect(emittedMenuSelect).toBe(compTypeSelect);
  });
});
