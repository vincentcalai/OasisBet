import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    const dialogRefMock: MatDialogRef<any> = jasmine.createSpyObj('MatDialogRef', ['close']);
    component.dialogRef = dialogRefMock;
    component.onCancelClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close the dialog with "confirm"', () => {
    const dialogRefMock: MatDialogRef<any> = jasmine.createSpyObj('MatDialogRef', ['close']);
    component.dialogRef = dialogRefMock;
    component.onConfirmClick();
    expect(dialogRefMock.close).toHaveBeenCalledWith('confirm');
  });
});
