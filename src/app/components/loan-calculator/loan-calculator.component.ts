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
  creditScore;
  loanAmount;
  loanPeriod;

  constructor(private customerService: CustomerDataService,
              private router: Router) {
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
    }
  }

  // tslint:disable-next-line:typedef
  getCreditScore() {
    if (this.customer !== null && this.customer !== undefined) {
      return (this.customer.creditModifier / this.loanAmount) * this.loanPeriod;
    }

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
