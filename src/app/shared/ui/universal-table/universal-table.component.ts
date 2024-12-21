import {Component, EventEmitter, inject, Input, input, Output, output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {IStudent} from "../../interfaces/student.interface";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";



@Component({
  selector: 'app-universal-table',
  standalone: true,
  imports: [MatTableModule, MatIconButton, MatIcon, MatTooltip],
  templateUrl: './universal-table.component.html',
  styleUrl: './universal-table.component.scss'
})
export class UniversalTableComponent {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'gender','faculty'];
  @Input() dataSource!:any

  readonly dialog = inject(MatDialog);

  @Output() clickEdit = new EventEmitter<IStudent>();
  @Output() clickDelete = new EventEmitter();

  editStudent(student: IStudent): void {
    this.clickEdit.emit(student);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:number): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:id
    });
  }
}
