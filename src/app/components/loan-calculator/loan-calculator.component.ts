import {Component, OnInit} from '@angular/core';
import {CustomerDataService} from '../../services/customer-data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {
  customer;
  pic = new FormControl('').value;
  loanAmount;
  loanPeriod;
  minLoanAmount = 2000;
  maxLoanAmount = 10000;
  minLoanPeriod = 12;
  maxLoanPeriod = 60;
  minCreditScore = 1;
  standardPICLength = 11;
  isEligibleForAnyLoan: boolean;
  customerExistsOnDataBase: boolean;
  invalidAmount;
  invalidPeriod;

  constructor(private customerService: CustomerDataService, private router: Router) {
  }

  isEligibleForCurrentLoan(): boolean {
    return this.getCreditScore() >= this.minCreditScore;
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

  checkIsEligibleForAnyLoan(): void {
    this.customerService.checkIsEligibleForAnyLoan(this.pic).subscribe(
      response => {
        this.isEligibleForAnyLoan = response;
        console.log(response);
      }
    );
  }

  checkCustomerExistsOnDataBase(): void {
    if (this.pic.length === 11) {
      this.customerService.checkCustomerExistsOnDataBase(this.pic).subscribe(
        response => {
          this.customerExistsOnDataBase = response;
          console.log(response);
        }
      );
    }
  }


  checkCustomer(): void {
    if (this.pic.length === this.standardPICLength) {
      this.checkIsEligibleForAnyLoan();
      this.checkCustomerExistsOnDataBase();
    }
  }


  isValidLoanConditions(): boolean {
    return this.isValidLoanPeriod() && this.isValidLoanAmount();
  }

  isValidLoanPeriod(): boolean {
    return this.loanPeriod >= this.minLoanPeriod && this.loanPeriod <= this.maxLoanPeriod;
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

  isCorrectLoanPeriod(): boolean {
    return this.loanPeriod >= this.minLoanPeriod && this.loanPeriod <= this.maxLoanPeriod;
}

  isCorrectLoanAmount(): boolean {
    return this.loanAmount >= this.minLoanAmount && this.loanAmount <= this.maxLoanAmount;
  }

  isCorrectLoanParameters(): boolean {
    return this.isCorrectLoanPeriod() && this.isCorrectLoanAmount();
  }

  getLoanOffer(): void {

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

export class LoanOffer {
  constructor(
    public maxAmountForCurrentPeriod: number,
    public minPeriodForCurrentAmount: number,
  ) {
  }
}
