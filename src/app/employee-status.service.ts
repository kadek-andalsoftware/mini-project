import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_EMPLOYEE_STATUSES = gql`
  query {
    employeeStatuses {
      createdAt
      createdBy
      duration
      employeeStatusName
      employeeStatusType
      id
      isPKWTCompensation
      isProbation
      isUsed
      updatedAt
      updatedBy
    }
  }
`;

const ADD_EMPLOYEE_STATUS = gql`
  mutation AddEmployeeStatus($input: EmployeeStatusInput!) {
    addEmployeeStatus(input: $input) {
      id
      employeeStatusName
      employeeStatusType
      duration
      isPKWTCompensation
      isProbation
      isUsed
    }
  }
`;

const UPDATE_EMPLOYEE_STATUS = gql`
  mutation UpdateEmployeeStatus($id: ID!, $input: EmployeeStatusInput!) {
    updateEmployeeStatus(id: $id, input: $input) {
      id
      employeeStatusName
      employeeStatusType
      duration
      isPKWTCompensation
      isProbation
      isUsed
    }
  }
`;

const DELETE_EMPLOYEE_STATUS = gql`
  mutation DeleteEmployeeStatus($id: ID!) {
    deleteEmployeeStatus(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EmployeeStatusService {
  constructor(private apollo: Apollo) {}

  getEmployeeStatuses(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_EMPLOYEE_STATUSES }).valueChanges;
  }

  addEmployeeStatus(input: any): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE_STATUS,
      variables: { input },
      refetchQueries: [{ query: GET_EMPLOYEE_STATUSES }],
    });
  }

  updateEmployeeStatus(id: string, input: any): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE_STATUS,
      variables: { id, input },
      refetchQueries: [{ query: GET_EMPLOYEE_STATUSES }],
    });
  }

  deleteEmployeeStatus(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_STATUS,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEE_STATUSES }],
    });
  }
}