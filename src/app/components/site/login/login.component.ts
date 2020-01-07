import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form_fields = { email:"",password:"" } ;
  form = this.form_fields ;
  error = "";

  constructor(private apiService: ApiService , private modalService: NgbModal , private router: Router) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm() {
    this.form = this.form_fields;
  }

  submitForm() {
  	this.error = "";
  		let data = { email: this.form.email , password: this.form.password } ;

  		this.apiService.login(data).pipe()
	      .subscribe(
	        data => {
	          if(data.status) {
	          	let data_str = JSON.stringify(data.data);
	          	localStorage.setItem("user", data_str);
              localStorage.setItem("token", data.token);
	          	this.router.navigate(['apply']);
	          	setTimeout(() => {
                  location.reload();      
               }, 1000);
              
	          }
	          else
	          {
	          	this.error = data.message;
	          }
	          
	        },
	        error => {
		          this.error = error.error.message;
	        });
  }

}
