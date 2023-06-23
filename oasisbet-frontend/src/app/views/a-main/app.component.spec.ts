import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { SharedVarService } from 'src/app/services/shared-var.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let sharedVar: SharedVarService;
  let currentExceptionSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: SharedVarService, useValue: sharedVar }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    currentExceptionSubject = new BehaviorSubject<string>('');
    sharedVar = jasmine.createSpyObj('SharedVarService', ['currentException']);
    (sharedVar as any).currentException = currentExceptionSubject;

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: SharedVarService, useValue: sharedVar }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'oasisbet-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('oasisbet-frontend');
  });

  it('should handle currentException subscription', () => {
    const mockError = 'Test error message';
    currentExceptionSubject.next(mockError);
    spyOn(window, 'scroll');
    component.ngOnInit();
    expect(component.showError).toBeTrue();
    expect(component.errorMsg).toContain('Error: ' + mockError);
    expect(window.scroll).toHaveBeenCalledWith(0, 0);
  });

  it('should handle empty currentException', () => {
    currentExceptionSubject.next('');
    component.ngOnInit();
    expect(component.showError).toBeFalse();
  });

});
