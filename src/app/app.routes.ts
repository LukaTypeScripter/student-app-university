import { Routes } from '@angular/router';
import {StudentPageComponent} from "./components/student-page/student-page.component";

export const routes: Routes = [
  {
    component:StudentPageComponent,
    path: '',
    pathMatch: 'full'
  }
];
