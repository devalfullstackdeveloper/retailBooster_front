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
  document_list = [];
  add_pro_response = {};
  settings = {};
  company_list = {};
  orderId = "";
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
          this.display_block = "final_submit";
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
    location.href="https://remitademo.net/payment/v1/payment/extended/initialize";
  }
}
