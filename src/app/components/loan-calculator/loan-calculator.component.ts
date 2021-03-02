import {Component, OnInit} from '@angular/core';
import {CustomerDataService} from '../../services/customer-data.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {

  customer: Customer;
  pic = new FormControl('').value;
  loanAmount;
  loanPeriod;

  constructor(private customerService: CustomerDataService) {
  }


  // tslint:disable-next-line:typedef
  isEligibleForLoan() {
    if (this.getCreditScore() >= 1) {
      return true;
    }
    return false;

  }

  // tslint:disable-next-line:typedef
  getCreditScore() {
    return (this.customer.creditModifier / this.loanAmount) * this.loanPeriod;
  }
  // tslint:disable-next-line:typedef
  getCustomer(pic) {
    if (pic.length === 11) {

      console.log(this.pic);
      this.customerService.getCustomer(pic).subscribe(
        response => {
          console.log(response);
          this.customer = response;
        });

      // TODO think of a better way to reset these
      this.loanAmount = undefined;
      this.loanPeriod = undefined;
    }
  }

  // tslint:disable-next-line:typedef
  correctLoanParameters() {
    if ( this.loanPeriod >= 12 && this.loanPeriod <= 60 && this.loanAmount >= 2000 && this.loanAmount <= 10000) {
      return true;
    }
    return false;
  }

  // tslint:disable-next-line:typedef
  getMaximumAmountForChosenPeriod() {
    // credit score omitted since amount = (modifier * period) / score and here score needs to be 1.
    return Math.ceil(this.customer.creditModifier * this.loanPeriod);
  }

  // tslint:disable-next-line:typedef
  getMinimumPeriodForChosenAmount() {
    // credit score omitted since period = (score * amount) / modifier and score needs to be 1.
    return Math.ceil(this.loanAmount / this.customer.creditModifier);
  }


  ngOnInit(): void {

  }

}

export class Customer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: boolean,
    public pic: string,
    public creditModifier: number
  ) {
  }
}
