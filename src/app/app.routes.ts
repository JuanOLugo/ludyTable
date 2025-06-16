import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { LayoutTableComponent } from './components/layout/layout-table/layout-table.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'table',
    component: LayoutTableComponent,
    children: [
      {
        path:"",
        component: TableComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
];
