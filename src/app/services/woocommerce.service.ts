import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WoocommerceService {
  customerUrl =  "https://digitaldreamers.in/laundry/wp-json/wc/v3/customers?consumer_key=ck_aae3bbf858b90332dbc2dcc41fe9df7c0ce55916&consumer_secret=cs_4243e52e36c5a0065de151b550c1f8da48530a21";
  createOrderUrl =
    "https://digitaldreamers.in/laundry/wp-json/wc/v3/orders?consumer_key=ck_aae3bbf858b90332dbc2dcc41fe9df7c0ce55916&consumer_secret=cs_4243e52e36c5a0065de151b550c1f8da48530a21";
  paymentGatewayUrl =
    "https://digitaldreamers.in/laundry/wp-json/wc/v3/payment_gateways?consumer_key=ck_aae3bbf858b90332dbc2dcc41fe9df7c0ce55916&consumer_secret=cs_4243e52e36c5a0065de151b550c1f8da48530a21";
   ordersUrl =
    "https://digitaldreamers.in/laundry/wp-json/wc/v3/orders?consumer_key=ck_aae3bbf858b90332dbc2dcc41fe9df7c0ce55916&consumer_secret=cs_4243e52e36c5a0065de151b550c1f8da48530a21";

  constructor(private http: HttpClient) {}

  newOrder(payload): Observable<any> {
    const url = this.createOrderUrl;
    return this.http.post<any>(url, payload);
  }

  createCustomer(payload): Observable<any> {
    const url = this.customerUrl;
    return this.http.post<any>(url, payload);
  }

  getPayments() {
    return this.http.get(this.paymentGatewayUrl);
  }

  getOrders() {
    return this.http.get(this.ordersUrl);
  }
}
