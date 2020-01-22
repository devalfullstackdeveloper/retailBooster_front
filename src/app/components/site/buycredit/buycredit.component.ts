import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-buycredit',
  templateUrl: './buycredit.component.html',
  styleUrls: ['./buycredit.component.css']
})
export class BuycreditComponent implements OnInit {
  display_block = "store";
  store_list = <any>[];
  product_list = <any>[];
  store_product_list = <any>[];
  top_product_list = <any>[];
  product = <any>[];
  store_id = "";
  user = <any>{};
  document_list_count = 0;
  repaymentPeriod = "2";
  document_list = [];
  add_pro_response = {};
  settings:any = {};
  final_calculation = {"vat":0,"admin_fees":0,"shipping_fees":0,"sub_total":0,"total_cost":0,"offer_amount":0,"balance_paid":0 , "emi":0};
  final_submit = <any>{};
  company_list = {};
  repayment_view_data = {};
  orderId = "";
  delieveryAddress = "";
  product_order = { employeeId: "",whereWork:"" };
  constructor(private apiService: ApiService , private modalService: NgbModal , private router: Router) { }

  ngOnInit() {
    this.display_block = "store";
    this.getStore();
    this.getProducts();
    this.getCompany();

    this.user = JSON.parse(localStorage.getItem('user'));

    this.apiService.getSettingValues().pipe()
      .subscribe(
        data => {

         this.settings = data.data;
         
        },
        error => {
         
        });
  }

  getStore() {
    this.apiService.get_store()
    .subscribe(
      data => {
        if(data.status) {
          this.store_list = data.data;
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });
  }

  getCompany() {
    
    this.apiService.get_company()
    .subscribe(
      data => {
        if(data.status) {
          this.company_list = data.data;
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });
  }

  getProducts() {
    this.apiService.get_products()
    .subscribe(
      data => {
        if(data.status) {
          this.product_list = data.data;
          for (var i = 0; i < this.product_list.length; i++) {
            if(this.product_list[i].isFeatured) {
              this.top_product_list.push(this.product_list[i]);
            }
          }
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });
  }


  selectStore(store_id) {
    this.store_id = store_id;
    this.store_product_list = [];
    for (var i = 0; i < this.product_list.length; i++) {
      if(this.product_list[i].store==store_id) {
        this.store_product_list.push(this.product_list[i]);
      }
    }

    this.display_block = "product";
  }

  selectProduct(product) {
    product.qty = "1";
    this.product = product;
    this.display_block = "product_detail";
    console.log();
  }

  backToProducts() {
    this.display_block = "store";
  }

  addProduct() {
    let add_pro = { "loanId": this.user.loanId, "storeId":this.product.store, "productId":this.product._id, "unitPrice" : this.product.unitprice, "quantity" : this.product.qty, "totalAmount" : this.product.unitprice*this.product.qty };

    this.apiService.addProduct(add_pro)
    .subscribe(
      data => {
        if(data.status) {
          this.add_pro_response = data.data
          this.document_list_count = data.documentList.length;
          this.document_list = data.documentList;
          this.orderId = data.data._id;
          this.display_block = "salary_history";
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });

    
  }
  salarySubmit() {

    let add_pro = { "bankStatement": "", "govermentId":"", "passportOrDrivingLicense":"", "utilityBill" : "", "whereWork" : this.product_order.whereWork, "orderId" :  this.orderId, "employeeId": this.product_order.employeeId, "selectedBank":""};

    this.apiService.fileUpload(add_pro)
    .subscribe(
      data => {
        if(data.status) {
          this.final_submit = data.data;
          this.calculate_price();
          this.display_block = "final_submit";
          this.loanCalculator();

        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });
    
  }

  loanCalculator() {

      let request = { "orderId" :  this.orderId, "tenorAgreed": this.repaymentPeriod, "loanId":this.user.loanId,"amount":this.final_calculation.total_cost};

    this.apiService.loanCalculator(request)
    .subscribe(
      data => {
        if(data.status) {
          this.repayment_view_data = data.data;
          this.loanEligible();
          
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });

  }

  loanEligible() {

      let request = { "orderId" :  this.orderId, "tenorAgreed": this.repaymentPeriod };

    this.apiService.loanEligible(request)
    .subscribe(
      data => {
        if(data.status) {
          if(this.final_calculation.total_cost>=data.eligibilieAmount) {
            this.final_calculation.balance_paid = this.final_calculation.total_cost - data.eligibilieAmount;
          }
          

          this.final_calculation.offer_amount = this.final_calculation.total_cost <data.eligibilieAmount ? this.final_calculation.total_cost : data.eligibilieAmount;
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });

  }

  calculate_price() {
    //final_calculation = {"vat":0,"admin_fees":0,"shipping_fees":0,"sub_total":0,"total_cost":0,"offer_amount":0,"balance_paid":0};

    this.final_calculation.shipping_fees = this.settings.productSetting.shippinFee;
    this.final_calculation.sub_total = this.final_submit.totalAmount+this.final_calculation.shipping_fees;

    this.final_calculation.vat = (this.final_calculation.sub_total*this.settings.productSetting.VAT)/100;

    this.final_calculation.admin_fees = this.settings.productSetting.adminFee;

    this.final_calculation.total_cost = this.final_calculation.sub_total + this.final_calculation.vat + this.final_calculation.admin_fees;
    

  }

  loanSubmit(isPay) {
    let request = { "orderId" :  this.orderId, "tenorAgreed": this.repaymentPeriod, "delieveryAddress" : this.delieveryAddress, "shippingFee": this.final_calculation.shipping_fees, "subTotal" : this.final_calculation.sub_total, "loanAmount" : this.final_calculation.total_cost, "eligibileLoan" : this.final_calculation.offer_amount , "emi" : this.final_calculation.emi, "balancePaid" : this.final_calculation.balance_paid, "applicationStatus" : "submitted"};

    this.apiService.loanSubmit(request)
    .subscribe(
      data => {
        if(data.status) {
          if(isPay=="1") {
            this.payNow();
          }
          else
          {
            alert('Loan Application added successfully.')
          }
        }
        else
        {
          alert(data.message);
        }
        
      },
      error => {
          alert(error.error.message);
      });
  }

  payNow() {

    let payment_request = {
        "transactionId": "1264551231",
        "email": "oshadami@specs.com",
        "amount": 26,
        "currency": "NGN",
        "firstName": "Mike",
        "lastName": "Oshadami",
        "phoneNumber": "080231456789",
        "customerid": "oshadami@specs.com",
        "narration": "payment tst",
        "extendedData": "null",
        "returnUrl": "http://localhost:4200/paymentresponse"
        }


    this.apiService.payNow(payment_request)
    .subscribe(
      data => {
        console.log(data);
        
      },
      error => {
          //alert(error.error.message);
      });
  }
}
