import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../components/loan-calculator/loan-calculator.component';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private  http: HttpClient) {
  }


  getCustomer(pic): Observable<Customer> {
    console.log('In getCustomer() of CustomerDataService');
    return this.http.get<Customer>(`http://localhost:8080/findByPic?pic=${pic}`);
  }

  // This method is verifying if the customer tried to hack their variables in the browser to report a higher credit score
  // I don't completely understand how to return a boolean yet
  verifyCustomerData(pic, loanAmount, loanPeriod): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/verifyCustomerData?pic=${pic}&loanAmount=${loanAmount}&loanPeriod=${loanPeriod}`);
  }
}
