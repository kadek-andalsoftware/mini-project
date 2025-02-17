import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeStatusListComponent } from './employee-status-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee-statuses', pathMatch: 'full' },
  { path: 'employee-statuses', component: EmployeeStatusListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}