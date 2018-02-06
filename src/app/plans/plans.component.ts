import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { EmployeeDataService } from '../services/employee-data.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  employees: IEmployee[];
  selectEmployee: IEmployee;
  selectedEmployeePlans: IPlan[];
  years: number[];
  selectYear: number;
  selectedEmployeeSelectedYearPlans: IPlan[];
  sums: number[] = [0, 0, 0, 0];

  constructor(private auth: AuthService, private router: Router, private empDataSvc: EmployeeDataService) {
  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      console.warn('Authentication is required');
      this.router.navigate(['login']);
    }
    this.empDataSvc.getAllEmployees().subscribe( result => {
      this.employees = result;
    });
  }

  loadPlansFor(employee) {
      let employeeId = employee.id;
      this.selectEmployee = employee;
      this.empDataSvc.getEmployeePlans(employeeId).subscribe(result => {
        this.selectedEmployeePlans = result;
        this.years = [];
        this.selectedEmployeePlans.forEach((value, index) => this.years[value.year] = value.year);
        this.years = this.years.filter(val => val > 0);
        this.selectYear = this.selectYear || this.years[0];
        if (this.years.indexOf(this.selectYear) < 0){
          this.selectYear = this.years[0];
        }
        // tslint:disable-next-line:max-line-length
        this.selectedEmployeeSelectedYearPlans = this.selectedEmployeePlans.filter( val => val.year === this.selectYear);
        this.calculateSum();
      });
  }
  onYearSelected(year) {
    this.selectYear = +year;
    this.selectedEmployeeSelectedYearPlans = this.selectedEmployeePlans.filter( val => val.year === this.selectYear);
    this.calculateSum();
  }

  calculateSum() {
    this.sums = [0, 0, 0, 0];
    this.selectedEmployeeSelectedYearPlans.forEach(value => {
      this.sums[0] += value.q1;
      this.sums[1] += value.q2;
      this.sums[2] += value.q3;
      this.sums[3] += value.q4;
    });
    let b = this.sums;
  }

}
