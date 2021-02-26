import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../components/loan-calculator/loan-calculator.component';
import {API_URL} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private  http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getCustomer(pic) {
    console.log('In getCustomer() of CustomerDataService');
    return this.http.get<Customer>(`http://localhost:8080/findByPic?pic=${pic}`);
  }
}
