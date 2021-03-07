import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoanOffer} from '../components/loan-calculator/loan-calculator.component';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private  http: HttpClient) {
  }

  getLoanOffer(pic, loanAmount, loanPeriod): Observable<LoanOffer> {

    return this.http.get<LoanOffer>(`http://localhost:8080/getLoanOffer?pic=${pic}&loanAmount=${loanAmount}&loanPeriod=${loanPeriod}`);
  }

  // This method is verifying if the customer tried to hack their variables in the browser to report a higher credit score
  // I don't completely understand how to return a boolean yet
  checkIsEligibleForAnyLoan(pic): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/checkIsEligibleForAnyLoan?pic=${pic}`);
  }

  checkCustomerExistsOnDataBase(pic): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/customerExistsOnDataBase?pic=${pic}`);
  }
}
