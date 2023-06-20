import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsSideNavComponent } from './odds-side-nav.component';

describe('OddsSideNavComponent', () => {
  let component: OddsSideNavComponent;
  let fixture: ComponentFixture<OddsSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsSideNavComponent);
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
