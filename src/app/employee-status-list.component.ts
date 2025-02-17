import { Component, OnInit } from '@angular/core';
import { EmployeeStatusService } from './employee-status.service';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxButtonModule, DxTextBoxModule, DxCheckBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-employee-status-list',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxButtonModule, DxTextBoxModule, DxCheckBoxModule], // Impor modul yang diperlukan
  templateUrl: './employee-status-list.component.html',
  styleUrls: ['./employee-status-list.component.scss'],
})
export class EmployeeStatusListComponent implements OnInit {
  employeeStatuses: any[] = [];
  currentEmployeeStatus: any = {};

  constructor(private employeeStatusService: EmployeeStatusService) {}

  ngOnInit(): void {
    this.loadEmployeeStatuses();
  }

  loadEmployeeStatuses(): void {
    this.employeeStatusService.getEmployeeStatuses().subscribe((result: any) => {
      this.employeeStatuses = result.data.employeeStatuses;
    });
  }

  addEmployeeStatus(): void {
    this.employeeStatusService.addEmployeeStatus(this.currentEmployeeStatus).subscribe(() => {
      this.loadEmployeeStatuses();
      this.currentEmployeeStatus = {};
    });
  }

  updateEmployeeStatus(): void {
    this.employeeStatusService
      .updateEmployeeStatus(this.currentEmployeeStatus.id, this.currentEmployeeStatus)
      .subscribe(() => {
        this.loadEmployeeStatuses();
        this.currentEmployeeStatus = {};
      });
  }

  deleteEmployeeStatus(id: string): void {
    this.employeeStatusService.deleteEmployeeStatus(id).subscribe(() => {
      this.loadEmployeeStatuses();
    });
  }

  editEmployeeStatus(employeeStatus: any): void {
    this.currentEmployeeStatus = { ...employeeStatus };
  }
}