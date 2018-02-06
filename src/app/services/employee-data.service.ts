import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { observeOn } from 'rxjs/operators/observeOn';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class EmployeeDataService implements OnInit {

  employees: IEmployee[];
  employeePlans: IPlan[];

  constructor(private http: Http, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  getAllEmployees(): Observable<IEmployee[]> {
    if (this.auth.isAuthenticated()) {
      // tslint:disable-next-line:max-line-length
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth.token.token}`, 'X-Requested-With': 'XMLHttpRequest' });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('https://localhost:44344/api/employees', options).map((response: Response) => {
        this.employees = <IEmployee[]>response.json();
        return this.employees;
      }).catch(this.handleError);
    } else {
      this.router.navigate(['login']);
    }
  }

  getEmployeePlans(empId: number): Observable<IPlan[]> {
    if (this.auth.isAuthenticated()) {
      // tslint:disable-next-line:max-line-length
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth.token.token}`, 'X-Requested-With': 'XMLHttpRequest' });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(`https://localhost:44344/api/employees/${empId}/plans`, options).map((response: Response) => {
        this.employeePlans = <IPlan[]>response.json();
        return this.employeePlans;
      }).catch(this.handleError);
    } else {
      this.router.navigate(['login']);
    }
  }


  handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}

//#region employee data
const employees: IEmployee[] =
  [
    {
      firstName: 'John',
      lastName: 'Jackson',
      title: 'Project Manager',
      email: 'john@somecompany.ca',
      plans: null,
      id: 1,
    },
    {
      firstName: 'Dan',
      lastName: 'Davidson',
      title: 'Engineer',
      email: 'dan@somecompany.ca',
      plans: null,
      id: 2,
    },
    {
      firstName: 'Adam',
      lastName: 'Carr',
      title: 'Engineer',
      email: 'adam@somecompany.ca',
      plans: null,
      id: 3,
    }
  ];
//#endregion
