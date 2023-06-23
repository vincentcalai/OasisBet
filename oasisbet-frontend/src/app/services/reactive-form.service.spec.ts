import { TestBed } from '@angular/core/testing';

import { ReactiveFormService } from './reactive-form.service';
import { FormArray, ReactiveFormsModule } from '@angular/forms';

describe('ReactiveFormService', () => {
  let service: ReactiveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
    });
    service = TestBed.inject(ReactiveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('displayValidationErrors test cases', () => {
    const mockFormControl = service.fb.control(null);
    const mockFormGroup = service.fb.group({
      mockControl1: service.fb.control(null),
      mockControl2: service.fb.control(null),
    });
    const mockFormGroupWithFormArray = service.fb.group({
      mockFormArray: service.fb.array([
        service.fb.group({ mockControl: service.fb.control(null) }),
        service.fb.group({ mockControl: service.fb.control(null) }),
      ])
    })
    expect(mockFormControl.dirty).toBe(false);
    expect(mockFormControl.touched).toBe(false);
    service.displayValidationErrors(mockFormControl);
    expect(mockFormControl.dirty).toBe(true);
    expect(mockFormControl.touched).toBe(true);

    for (const controlName in mockFormGroup.controls) {
      const formControl = mockFormGroup.get(controlName);
      expect(formControl.dirty).toBe(false);
      expect(formControl.touched).toBe(false);
    }
    service.displayValidationErrors(mockFormGroup);
    for (const controlName in mockFormGroup.controls) {
      const formControl = mockFormGroup.get(controlName);
      expect(formControl.dirty).toBe(true);
      expect(formControl.touched).toBe(true);
    }
    const formArr = mockFormGroupWithFormArray.get('mockFormArray') as FormArray;
    expect(formArr.dirty).toBe(false);
    expect(formArr.touched).toBe(false);
    service.displayValidationErrors(mockFormGroupWithFormArray);
    expect(formArr.dirty).toBe(true);
    expect(formArr.touched).toBe(true);
    formArr.controls.forEach(element => {
    expect(element.get('mockControl').dirty).toBe(true);
    expect(element.get('mockControl').touched).toBe(true);
    })
  });
});
