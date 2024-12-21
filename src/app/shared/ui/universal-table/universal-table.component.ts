import {Component, EventEmitter, Input, input, Output, output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {IStudent} from "../../interfaces/student.interface";



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

  @Output() clickEdit = new EventEmitter<IStudent>();

  editStudent(student: IStudent): void {
    this.clickEdit.emit(student);
  }
}
