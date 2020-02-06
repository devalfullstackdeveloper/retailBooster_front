import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form_fields = { email:"",mobile: "",password:"",bvn:"" } ;
  form = this.form_fields ;
  error = "";
  error_verify = "";
  verify_data_resp = <any>{};
  otp = "";
  is_verified = 0;
  is_bvn_verified = 0;
  otpId = "";

  constructor(private apiService: ApiService , private modalService: NgbModal , private router: Router) { }

  ngOnInit() {
	  this.initForm();
  }

  initForm() {
	this.form = this.form_fields;
  }

  mobileVerify(content) {

  

  	if(this.form.email=="") {
  		alert('Please Enter Email')
  	}
  	else if(this.form.mobile=="") {
  		alert('Please Enter Mobile No.')
  	}
  	else
  	{
	  	let data = { "mobileNo" : this.form.mobile, "email" : this.form.email};


	  	this.apiService.send_signup_otp(data).pipe()
	      .subscribe(
	        data => {
				// console.log("Otp-sent---",data)
	          if(data.status) {
				// this.verify_data_resp.data = data.data._id;
				  this.otpId = data.data._id;
				  this.open(content);
	          	// this.is_bvn_verified = 1;
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
  }

  bvnVerify() {
 	 if(this.form.bvn=="") {
  		alert('Please Enter BVN.')
  	}
  	else
  	{
  			let data = { "bvn" : this.form.bvn};


	  	this.apiService.bvnVerify(data).pipe()
	      .subscribe(
	        data => {
	          if(data.status) {
	          	this.verify_data_resp = data;
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
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  submitOTP() {
  	let data = { "id" : this.otpId, "verificationOtp" : this.otp};
  	this.error = "";
  	this.apiService.verify_signup_otp(data).pipe()
	      .subscribe(
	        data => {
	          if(data.status) {
	          	this.is_verified = 1;
	          	this.modalService.dismissAll();
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

  submitForm() {
  	this.error = "";
  	if(!this.is_verified) {
  		this.error = "Please verify mobile no";
  	}
  	else
  	{
  		let data = { email: this.form.email , mobileNo: this.form.mobile , bvn: this.form.bvn , password: this.form.password ,otpId: this.otpId} ;

  		this.apiService.signup(data)
	      .subscribe(
	        data => {
	          if(data.status) {
	          	let data_str = JSON.stringify(data.data);
	          	localStorage.setItem("user", data_str);
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

  resendOtp(){
	  let data = {id : this.otpId};
	  this.error = "";
	  this.apiService.resend_signup_otp(data).pipe()
	  .subscribe( data => {
		//   console.log("Resend-Otp----",data);
		  if(data.status){
			this.otpId = data.data._id
		  }else{
			this.error = data.message
		  }
	  },error => {
		  this.error = error.error.message;
	  })
  }

}