import {Component, OnInit} from '@angular/core';
import {CustomerDataService} from '../../services/customer-data.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {
  loanOffer;
  pic = new FormControl('').value;
  loanAmount;
  loanPeriod;
  minLoanAmount = 2000;
  maxLoanAmount = 10000;
  minLoanPeriod = 12;
  maxLoanPeriod = 60;
  standardPICLength = 11;
  isEligibleForAnyLoan: boolean;
  customerExistsOnDataBase: boolean;

  constructor(private customerService: CustomerDataService) {
  }


  checkCustomer(): void {
    if (this.pic.length === this.standardPICLength) {
      this.checkCustomerExistsOnDataBase();
      this.checkIsEligibleForAnyLoan();
    }
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

  checkIsEligibleForAnyLoan(): void {
    this.customerService.checkIsEligibleForAnyLoan(this.pic).subscribe(
      response => {
        this.isEligibleForAnyLoan = response;
        console.log(response);
      }
    );
  }

  isEligibleForCurrentLoan(): boolean {
    return this.loanOffer.maxAmountForCurrentPeriod >= this.loanAmount && this.loanOffer.minPeriodForCurrentAmount <= this.loanPeriod;
  }


  isCorrectLoanParameters(): boolean {
    return this.isCorrectLoanAmount() && this.isCorrectLoanPeriod();
  }

  isCorrectLoanAmount(): boolean {
    return this.loanAmount >= this.minLoanAmount && this.loanAmount <= this.maxLoanAmount;
  }

  isCorrectLoanPeriod(): boolean {
    return this.loanPeriod >= this.minLoanPeriod && this.loanPeriod <= this.maxLoanPeriod;
  }


  getLoanOffer(): void {
    if (this.isCorrectLoanParameters()) {
      this.customerService.getLoanOffer(this.pic, this.loanAmount, this.loanPeriod).subscribe(
        response => {
          console.log(response);
          this.loanOffer = response;
          console.log(this.loanOffer);
        });
    }

  }

  getMaxAmountForCurrentPeriod(): number {
    return this.loanOffer.maxAmountForCurrentPeriod;
  }

  getMinPeriodForCurrentAmount(): number {
    return this.loanOffer.minPeriodForCurrentAmount;
  }

  ngOnInit(): void {

  }


}


export class LoanOffer {
  constructor(
    public maxAmountForCurrentPeriod: number,
    public minPeriodForCurrentAmount: number,
  ) {
  }
}
