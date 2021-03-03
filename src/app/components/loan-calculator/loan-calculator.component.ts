import {Component, OnInit} from '@angular/core';
import {CustomerDataService} from '../../services/customer-data.service';
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
  minLoanAmount = 2000;
  maxLoanAmount = 10000;
  minPeriod = 12;
  maxPeriod = 60;
  minCreditScore = 1;
  standardPICLength = 11;

  constructor(private customerService: CustomerDataService) {
  }

  isEligibleForCurrentLoan(): boolean {
    return this.getCreditScore() >= this.minCreditScore;
  }

  isEligibleForAnyLoan(): boolean {
    return this.customer.creditModifier >= this.minLoanAmount / this.maxPeriod;
  }

  getCreditScore(): number {
    return (this.customer.creditModifier / this.loanAmount) * this.loanPeriod;
  }


  getCustomer(pic): void {
    if (pic.length === this.standardPICLength) {
      console.log(this.pic);
      this.customerService.getCustomer(pic).subscribe(
        response => {
          console.log(response);
          this.customer = response;
        });
    }
  }

  verifyCustomer(): boolean {
    return false;
  }

  resetCustomer(): void {
    // TODO think of a better way to reset these
    this.loanAmount = undefined;
    this.loanPeriod = undefined;
  }

  isValidLoanConditions(): boolean {
    return  this.isValidLoanPeriod() && this.isValidLoanAmount();
  }

  isValidLoanPeriod(): boolean {
    return this.loanPeriod >= this.minPeriod && this.loanPeriod <= this.maxPeriod;
  }

  isValidLoanAmount(): boolean {
    return this.loanAmount >= this.minLoanAmount && this.loanAmount <= this.maxLoanAmount;
  }

  getMaximumAmountForChosenPeriod(): number {
    // no credit score in formula because in this case it has to be 1
    return Math.ceil(this.customer.creditModifier * this.loanPeriod);
  }

  getMinimumPeriodForChosenAmount(): number {
    // no credit score in formula because in this case it has to be 1
    return Math.ceil(this.loanAmount / this.customer.creditModifier);
  }

  // this method not necessary for given test cases but in reality there might be cases where credit modifier <1
  // but still not 0.
  isModifierTooLow(): boolean {
   return (this.customer.creditModifier / 2000) * 60 < 1;
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
