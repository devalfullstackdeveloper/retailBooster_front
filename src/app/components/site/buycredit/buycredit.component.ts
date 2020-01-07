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
  constructor(private apiService: ApiService , private modalService: NgbModal , private router: Router) { }

  ngOnInit() {
    this.display_block = "store";
    this.getStore();
    this.getProducts();
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
  }

  backToProducts() {
    this.display_block = "store";
  }

  salaryHistor() {
    this.display_block = "salary_history";
  }
  salarySubmit() {
    this.display_block = "final_submit";
  }
  payNow() {
    location.href="https://remitademo.net/payment/v1/payment/extended/initialize";
  }
}
