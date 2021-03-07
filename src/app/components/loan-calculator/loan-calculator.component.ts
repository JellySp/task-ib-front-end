import {Component, OnInit} from '@angular/core';
import {CustomerDataService} from '../../services/customer-data.service';
import {FormControl} from '@angular/forms';

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
        }
      );
    }
  }



  checkIsEligibleForAnyLoan(): void {
    this.customerService.checkIsEligibleForAnyLoan(this.pic).subscribe(
      response => {
        this.isEligibleForAnyLoan = response;

      }
    );
  }

  isEligibleForCurrentLoan(): boolean {
    if (this.loanAmount !== undefined && this.loanPeriod !== undefined && this.loanOffer !== undefined) {
      return this.loanOffer.maxAmountForCurrentPeriod >= this.loanAmount && this.loanOffer.minPeriodForCurrentAmount <= this.loanPeriod;
    }
    return false;
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
    if (this.loanOffer !== null) {
      return this.loanOffer.maxAmountForCurrentPeriod;
    }
  }

  getMinPeriodForCurrentAmount(): number {
    return this.loanOffer.minPeriodForCurrentAmount;
  }

  clearLoanParameters(): void {
    this.loanAmount = undefined;
    this.loanPeriod = undefined;
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
