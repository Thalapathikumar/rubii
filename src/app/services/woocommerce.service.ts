import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WoocommerceService {
  customerUrl =  "https://rubiiecotec.com/laundry/wp-json/wc/v3/customers?consumer_key=ck_428c9eceb428be1f769c945c8700fb2095fc584c&consumer_secret=cs_309bd918c7abe106ad4f26858954e40558e09535";
  createOrderUrl =
    "https://rubiiecotec.com/laundry/wp-json/wc/v3/orders?consumer_key=ck_428c9eceb428be1f769c945c8700fb2095fc584c&consumer_secret=cs_309bd918c7abe106ad4f26858954e40558e09535";
  paymentGatewayUrl =
    "https://rubiiecotec.com/laundry/wp-json/wc/v3/payment_gateways?consumer_key=ck_428c9eceb428be1f769c945c8700fb2095fc584c&consumer_secret=cs_309bd918c7abe106ad4f26858954e40558e09535";
   ordersUrl =
    "https://rubiiecotec.com/laundry/wp-json/wc/v3/orders?consumer_key=ck_428c9eceb428be1f769c945c8700fb2095fc584c&consumer_secret=cs_309bd918c7abe106ad4f26858954e40558e09535";

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
