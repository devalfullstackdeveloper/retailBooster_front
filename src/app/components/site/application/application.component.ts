import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  userData:any = {};
  personal1:any = {
                    bvn: "",
                    firstName: "",
                    lastName: "",
                    title: "",
                    gender: "",
                    maritalStatus: "",
                    meansOfIdentification: "",
                    identificationNumber: "",
                    expiryDateOfId: "",
                    dateOfBirth: "",
                    numberOfDependents: "",
                    age: "",
                    educationalBackGround: "",
                    productId: ""
                };

  contact1:any = {
                    mobileNo1: "",
                    mobileNo2: "",
                    email: "",
                    homeAddress: "",
                    nearestBusStop: "",
                    buildingDiscription: "",
                    state1: "",
                    contactLga: "",
                    typeOfApartment: "",
                    accomodationType: "",
                    HowtogetToYourHome: "",
                    commonNameCalledAtHome: "",
                    lengthOfStay: "",
                    refereeName: "",
                    refereeMobileNo:"",
                    spouseName: "",
                    spouseMobileNo: "",
                    spouseEmail:"",
                };

  loanId = "";

  error = "";
  personal:any = {};
  contact:any = {};
  employment:any = {};
  loaninfo:any = {};
  settings:any = {};
  step = "step-1";
  loading = false;
  lgaListState:any = {};


  constructor(private apiService: ApiService , private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("user")) {
      this.loading = true;
      
      this.apiService.getSettingValues().pipe()
      .subscribe(
        data => {

         this.settings = data.data;
         let user = localStorage.getItem("user");
        this.userData = JSON.parse(user);
        
        if(this.userData.loanId && this.userData.loanId!="")
        this.loanId = this.userData.loanId;
        
        this.personal.bvn = this.userData.bvn;
        this.loadApplicationStep("1");
        this.loading = false; 
        },
        error => {
         this.loading = false;
        });


    }
    else
    {
      this.router.navigate(['login']);
    }
  }

  verifyBVN() {
  	
  }

  loadApplicationStep(step) {
      this.step = "step-"+step;

      this.loading = true;
      this.apiService.getLoanDetail({loanId:this.loanId}).pipe()
      .subscribe(
        data => {
          this.loading = false;
            if(data.status) {
              if(step=="1")
              {
                data.data.expiryDateOfId = this.getDateFormat(data.data.expiryDateOfId);
                data.data.dateOfBirth = this.getDateFormat(data.data.dateOfBirth);
                this.personal = data.data;  
              }
              else if(step=="2") {
                this.contact = data.data;
              }
              else if(step=="3") {
                this.employment = data.data;
              }
              else if(step=="4") {
                this.loaninfo = data.data;
              }
              

            }
        },
        error => {
          this.loading = false;
          this.error = error.error.message;
        });
  }

  getDateFormat(d) {
    let d_arr = d.split("T");
    return d_arr[0];
  }

  saveStep1() {
    this.loading = true;
    this.personal.step = this.step;
    this.apiService.newLoanApp(this.personal).pipe()
      .subscribe(
        data => {
          this.loading = false;
            if(data.status) {
              this.loanId = data.data._id;
              this.step = "step-2";
              this.loadApplicationStep("2");

            }
        },
        error => {
          this.loading = false;
          this.error = error.error.message;
        });
  }

  saveStep2() {
    this.loading = true;
    this.contact.step = this.step;
    this.contact.loanId = this.loanId;
    this.apiService.newLoanApp(this.contact).pipe()
      .subscribe(
        data => {
          this.loading = false;
            if(data.status) {
              this.step = "step-3";
              this.loadApplicationStep("3");
            }
        },
        error => {
          this.loading = false;
          this.error = error.error.message;
        });
  }

  saveStep3() {
    this.loading = true;
    this.employment.step = this.step;
    this.employment.loanId = this.loanId;
    this.apiService.newLoanApp(this.employment).pipe()
      .subscribe(
        data => {
          this.loading = false;
            if(data.status) {
              this.step = "step-4";
              this.loadApplicationStep("4");
            }
        },
        error => {
          this.loading = false;
          this.error = error.error.message;
        });
  }

  saveStep4() {
    this.loading = true;
    this.loaninfo.step = this.step;
    this.loaninfo.loanId = this.loanId;
    this.apiService.newLoanApp(this.loaninfo).pipe()
      .subscribe(
        data => {
          this.loading = false;
            if(data.status) {
              this.step = "step-5";
            }
        },
        error => {
          this.loading = false;
          this.error = error.error.message;
        });
  }

  loadLGAFromState(state) {

        this.apiService.getLGAFromState( state).subscribe((resp: any) => {
            if(resp.status){
               this.lgaListState = resp.data.lgas;
            } else {
                this.error = resp.message;
            }

        },(error: any) => {
            this.error = error;
        })
    }

}
