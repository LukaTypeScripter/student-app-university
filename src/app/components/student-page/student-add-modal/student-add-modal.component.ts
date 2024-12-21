import {Component, inject, Inject} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {IStudent} from "../../../shared/interfaces/student.interface";
import {UniversalInputComponent} from "../../../shared/ui/universal-input/universal-input.component";
import {CampaignService} from "../../../service/campaign.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-student-add-modal',
  standalone: true,
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatInput,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    UniversalInputComponent,
    MatSnackBarModule
  ],
  templateUrl: './student-add-modal.component.html',
  styleUrl: './student-add-modal.component.scss'
})
export class StudentAddModalComponent {
  private readonly fb = inject(FormBuilder)
  public campaignService = inject(CampaignService)
  public snackBar = inject(MatSnackBar)
  public dialogRef = inject(MatDialogRef<StudentAddModalComponent>)

  studentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IStudent
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['MALE', Validators.required],
      faculty: ['', Validators.required]
    });
    if(data) {
      this.studentForm.patchValue(data);
    }
  }

  onSubmit() {
    if(!this.studentForm.valid) return;

    if(this.data) {
      this.campaignService.updateStudent(this.data.id,this.studentForm.getRawValue()).subscribe({
        next: () => {
          this.snackBar.open('სტუდენტი წარმატებით დარედაქტირდა დაემატა!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.campaignService.triggerUpdate()
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('ერრორ მოხდა გთხოვ ცადე თავიდან!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    } else {
      this.campaignService.addStudent(this.studentForm.getRawValue()).subscribe({
        next: () => {
          this.snackBar.open('სტუდენტი წარმატებით დაემატა!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.campaignService.triggerUpdate()
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('ერრორ მოხდა გთხოვ ცადე თავიდან!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    }
  }
}
