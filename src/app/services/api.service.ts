import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as sha512 from 'js-sha512';

@Injectable()
export class ApiService {
    private actionUrl: string = "https://retailboosters.ng:4000/";
    private websiteUrl: string = "https://retailboosters.ng/";
    // private websiteUrl: string = "http://localhost:4200/";
    private paymentUrl: string = "https://remitademo.net/payment/v1/payment";
    private paymentPublicKey: string = "QzAwMDAxNTUzNjd8NDI3NzY0NzR8NzZjNTJkMjY5YTE0MDA1MGEyZTRlNzQ2YTM4YzJlMjc0OTQwMTk0NGFjN2VkNDBjZDcxMGViODhjM2VmOGI0MGE3YTNmNTA2ZTJlZDZjNTMxOTQ1MDNmNGM4ZTA0YjdjYjEyMTFkZmQ5OTA3ODllZjg0ZGRlYzcwMmFlYzFiZWI=";
    private paymentSecretKey: string = "403c8c0b03443e790811399f4569cf4b63c0873d47d4671e0e3a11929c8966c135f6be03094d55d8f613d6e5df2a2bffebabc16901f1a868e00de8ec9fb50a96";


    private headers = new Headers({
      'Authorization': localStorage.getItem('token')
    })


    constructor(private http: HttpClient) {
       
    }

    send_signup_otp(data) {
        return this.http.post<any>(this.actionUrl+`api/otp/sendOtp`, data )
            .pipe(map(res => {
                return res;
            }));
    }

    resend_signup_otp(data){
        return this.http.post<any>(this.actionUrl+`api/otp/resendOtp`, data )
            .pipe(map(res => {
                return res;
            }));
    }

    verify_signup_otp(data) {
        return this.http.post<any>(this.actionUrl+`api/otp/verifyOtp`, data )
            .pipe(map(res => {
                return res;
            }));
    }

    signup(data) {
        return this.http.post<any>(this.actionUrl+`api/auth/register`, data )
            .pipe(map(res => {
                return res;
            }));
    }

    login(data) {
        return this.http.post<any>(this.actionUrl+`api/auth/login`, data )
            .pipe(map(res => {
                return res;
            }));
    }

    login_user() {
        return this.http.get<any>(this.actionUrl+`api/auth/me` , this.getHttpOptions())
            .pipe(map(res => {
                return res;
            }));
    }

    get_store() {
        return this.http.get<any>(this.actionUrl+`api/store/getStore` )
            .pipe(map(res => {
                return res;
            }));
    }

    get_products() {
        return this.http.get<any>(this.actionUrl+`api/product/getAllProduct` )
            .pipe(map(res => {
                return res;
            }));
    }

    getSettingValues() {

            return this.http.get<any>(this.actionUrl+`api/setting/`)
            .pipe(map(res => {
                return res;
            }));
        
    }

    getCMS(data) {

            return this.http.post<any>(this.actionUrl+`api/cms/findOne`,data)
            .pipe(map(res => {
                return res;
            }));
        
    }

    newLoanApp(data) {

        

        return this.http.post<any>(this.actionUrl+`api/loanapp/newLoanApp`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    getLoanDetail(data) {
        return this.http.post<any>(this.actionUrl+`api/loanapp/getdetail`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    getUserRepayment(){
        var data = {}
        return this.http.post<any>(this.actionUrl+`api/buyProduct/getUserRepayment`,data,this.getHttpOptions() )
        .pipe(map(res => {
            return res;
        }))
    }

    getUserOrders(){
        return this.http.get<any>(this.actionUrl+`api/buyProduct/getUserOrders`,this.getHttpOptions())
        .pipe(map(res => {
            return res;
        }))
    }

    getLoanStatus(data){
        return this.http.post<any>(this.actionUrl+`api/buyProduct/getLoanStatus`,data,this.getHttpOptions())
        .pipe(map(res => {
            return res;
        }))
    }

    getHttpOptions() {
        let headers_object = new HttpHeaders({
            'Content-Type': 'application/json',
           'Authorization': "Bearer "+ localStorage.getItem('token')
        });

        let httpOptions = {
          headers: headers_object
        };
        return httpOptions;
    }

    getLGAFromState(state: string) {
        return this.http.post<any>(this.actionUrl+`api/statelga/findOneState`,{state})
            .pipe(map(res => {
                return res;
            }));
    }

    addProduct(data) {
        return this.http.post<any>(this.actionUrl+`api/buyProduct/add`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    fileUpload(data) {
     const formData = new FormData();
    
        formData.append('whereWork', data.whereWork);
        formData.append('orderId', data.orderId);
        formData.append('employeeId', data.employeeId);

        return this.http.post<any>(this.actionUrl+`api/buyProduct/fileUpload`,formData )
            .pipe(map(res => {
                return res;
            }));
    }

    get_company() {
        return this.http.get<any>(this.actionUrl+`api/company/getCompany` )
            .pipe(map(res => {
                return res;
            }));
    }

    loanCalculator(data) {
        return this.http.post<any>(this.actionUrl+`api/loanapp/LoanCalculator
`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    loanEligible(data) {
        return this.http.post<any>(this.actionUrl+`api/loanapp/loanEligible
`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    loanSubmit(data) {
        return this.http.post<any>(this.actionUrl+`api/buyProduct/add
`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    payNow(data) {
        data.returnUrl = this.websiteUrl+"paymentresponse";
        let headers_object = new HttpHeaders({
           "Content-Type": "application/json",
           "publicKey": this.paymentPublicKey,
           "secretKey": this.paymentSecretKey
        });

        let httpOptions = {
          headers: headers_object
        };

        return this.http.post<any>(this.paymentUrl+`/extended/initialize`,data,httpOptions )
            .pipe(map(res => {
                return res;
            }));
    }

    payResponse(transactionId) {

        let headers_object = new HttpHeaders({
           "Content-Type": "application/json",
           "publicKey": this.paymentPublicKey,
            "TXN_HASH": sha512.sha512(transactionId+this.paymentSecretKey)
           
        });

        let httpOptions = {
          headers: headers_object
        };

        let data = {};

        return this.http.get<any>(this.paymentUrl+`/query/`+transactionId,httpOptions )
            .pipe(map(res => {
                return res;
            }));
    }

    approveLoan(data) {
        return this.http.post<any>(this.actionUrl+`api/admin/approveLoan
`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    mandateActivateOTP(data) {
        return this.http.post<any>(this.actionUrl+`api/admin/mandateActivateOTP
`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    resendMandateRequestOTP(data) {
        return this.http.post<any>(this.actionUrl+`api/admin/resendMandateRequestOTP
`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

     bvnVerify(data) {
        return this.http.post<any>(this.actionUrl+`api/loanapp/bvnVerify`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    sendContactMessage(data) {
        return this.http.post<any>(this.actionUrl+`api/contactUs/insertUpdate`,data,this.getHttpOptions() )
            .pipe(map(res => {
                return res;
            }));
    }

    forgotPassword(data){
        return this.http.post<any>(this.actionUrl+`api/user/forgot-password`,data )
            .pipe(map(res => {
                return res;
            }));
    }

    resetPassword(data){
        return this.http.post<any>(this.actionUrl+`api/user/resetPassword`,data )
            .pipe(map(res => {
                return res;
            }));
    }

    upload_documents( bankStatementFile: File,govermentIdFile: File,passportOrDrivingLicenseFile: File,utilityBillFile: File) {

        const formData = new FormData();

        if(govermentIdFile)
        formData.append('govermentId', govermentIdFile);
        if(bankStatementFile)
        formData.append('bankStatement', bankStatementFile);
        if(passportOrDrivingLicenseFile)
        formData.append('passportOrDrivingLicense', passportOrDrivingLicenseFile);
        if(utilityBillFile)
        formData.append('utilityBill', utilityBillFile);

        let headers_object = new HttpHeaders({
           'Authorization': "Bearer "+ localStorage.getItem('token')
        });

        let httpOptions = {
          headers: headers_object
        };

            
        return this.http.post<any>(this.actionUrl+`api/buyProduct/fileEdit`,formData,httpOptions)
        .pipe(map(res => {
            return res;
        }));
           
        
    }


}
