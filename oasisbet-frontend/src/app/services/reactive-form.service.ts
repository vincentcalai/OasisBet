import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {
  

  public readonly NUMERIC = new RegExp(/^[0-9]*$/);
  public readonly ALPHABET= new RegExp(/^[A-Za-z]*$/);
  public readonly EMAIL = new RegExp(/^[_A-Za-z0-9\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/);

  constructor(public fb: FormBuilder) { }

  initializeCreateUserForm() {
    return this.fb.group({
      username: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.pattern(this.ALPHABET),
          Validators.minLength(5),
          Validators.maxLength(20)
        ],
        updateOn: 'blur'
      }),
      password: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ],
        updateOn: 'blur'
      }),
      cfmPassword: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ],
        updateOn: 'blur'
      }),
      email: this.fb.control(null, {
        validators: this.emailAddrValidators(),
        updateOn: 'blur'
      }),
      contactNo: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.pattern(this.NUMERIC),
          Validators.maxLength(30)
        ]
      })
    },
    {
      validator: this.passwordMatchValidator('password', 'cfmPassword')
    });
  }

  emailAddrValidators() {
    return [
      Validators.required,
      Validators.pattern(this.EMAIL),
      Validators.maxLength(100),
    ]
  }

  passwordMatchValidator(password: string, cfmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const cfmPasswordControl = formGroup.controls[cfmPassword];
      if (cfmPasswordControl.errors && !cfmPasswordControl.errors.passwordMismatch) {
        return;
      }
      if (passwordControl.value !== cfmPasswordControl.value) {
        cfmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        cfmPasswordControl.setErrors(null);
      }
    };
  }

  initializeDepositFormControl(): FormControl {
    return new FormControl(null, 
      {
        validators: [
        Validators.required, 
        Validators.pattern(/^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/),
        Validators.max(199999.99),
        this.notZeroValidator()
      ],
       updateOn: 'blur'
      }
    );
  }

  initializeWithdrawalFormControl(): FormGroup {
    return this.fb.group({
      withdrawalAmt: this.fb.control(null, {
        validators: [
          Validators.required, 
          Validators.pattern(/^(0(\.\d{1,2})?|[1-9]\d{0,8}(\.\d{1,2})?)$/),
          Validators.max(199999.99),
          this.notZeroValidator()
        ],
        updateOn: 'blur'
      }),
      password: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ],
        updateOn: 'blur'
      })
    })
  }

  notZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseFloat(control.value);
      if (control.value === '0.' || value !== 0) {
        return null; 
      } else {
        return { notZero: true }; 
      }
    };
  }

  fieldErrorPrecedence(field: FormControl): string {
    if (!field.hasError('required')) {
      if (field.hasError('pattern')) {
        return 'pattern';
      } else if (field.hasError('maxlength')) {
        return 'maxlength';
      } else if (field.hasError('minlength')) {
        return 'minlength';
      } else if (field.hasError('max')) {
        return 'maxAmount';
      } 
    }
    return '';
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return field.invalid && !field.pristine && field.status !== 'PENDING' && field.errors != null;
  }

  displayValidationErrors(form: AbstractControl) {
    if (form instanceof FormControl) {
      this.markControlAsDirtyAndTouched(form);
    } else if (form instanceof FormGroup) {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control instanceof FormControl) {
          this.markControlAsDirtyAndTouched(control);
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          if (control instanceof FormArray) {
            this.markControlAsDirtyAndTouched(control);
          }
          this.displayValidationErrors(control);
        }
      });
    } else if (form instanceof FormArray) {
      form.controls.forEach(element => {
        this.displayValidationErrors(element);
      })
    }
  }

  markControlAsDirtyAndTouched(control: AbstractControl) {
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  }
}
