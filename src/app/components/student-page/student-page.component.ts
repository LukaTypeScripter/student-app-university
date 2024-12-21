import {Component, inject} from '@angular/core';
import {UniversalTableComponent} from "../../shared/ui/universal-table/universal-table.component";
import {MatButtonModule} from "@angular/material/button";
import {CampaignService} from "../../service/campaign.service";
import {BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {StudentAddModalComponent} from "./student-add-modal/student-add-modal.component";
import {IStudent} from "../../shared/interfaces/student.interface";
import {UniversalInputComponent} from "../../shared/ui/universal-input/universal-input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [
    UniversalTableComponent,
    MatButtonModule,
    NgIf,
    AsyncPipe,
    UniversalInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.scss'
})
export class StudentPageComponent {
  private readonly campaignService = inject(CampaignService)
  private readonly dialog = inject(MatDialog)

  $searchWord = new BehaviorSubject('')

  searchForm: FormGroup;
  private readonly fb = inject(FormBuilder)

  public student$ = this.$searchWord.pipe(
    switchMap((searchWord) => {
      return this.campaignService.getStudentUpdate$().pipe(
        switchMap(() => {
          return this.campaignService.getStudents(searchWord)
        })
      );
    })
  )
constructor() {
  this.searchForm = this.fb.group({
    search: ['', Validators.required],
  });

  this.searchForm.get('search')?.valueChanges.pipe(debounceTime(500),distinctUntilChanged()).subscribe((search) => {
    this.$searchWord.next(search)
  })
}
  openAddStudentModal() {
    const dialogRef = this.dialog.open(StudentAddModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Student Data:', result);
      }
    });
  }

  openEditStudentModal(student: IStudent) {
    const dialogRef = this.dialog.open(StudentAddModalComponent, {
      width: '400px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
