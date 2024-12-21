import {Component, Inject, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {CampaignService} from "../../../service/campaign.service";
import {IStudent} from "../../interfaces/student.interface";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  private readonly campaignService = inject(CampaignService)
  public snackBar = inject(MatSnackBar)
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
  }


  onDelete() {
    this.campaignService.deleteStudent(this.data).pipe(
      map((_) => {
        this.snackBar.open('სტუდენტი წარმატებით წაიშალა დაემატა!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.campaignService.triggerUpdate()

        this.dialogRef.close(true);
      })
    ).subscribe()
  }
}
