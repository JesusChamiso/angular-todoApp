import { LabsComponent } from './pages/labs/labs.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'labs',
    component: LabsComponent
  }
];
