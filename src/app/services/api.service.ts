import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    private actionUrl: string = "http://103.101.59.95:4000/";

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

        let headers_object = new HttpHeaders({
           'Content-Type': 'application/json',
           'publicKey': "dC5vbW9udWJpQGdtYWlsLmNvbXxiM2RjMDhjZDRlZTc5ZDIxZDQwMjdjOWM3MmI5ZWY0ZDA3MTk2YTRkNGRkMjY3NjNkMGZkYzA4MjM1MzI4OWFhODE5OGM4MjM0NTI2YWI2ZjZkYzNhZmQzNDNkZmIzYmUwNTkxODlmMmNkOTkxNmM5MjVhNjYwZjk0ZTk1OTkwNw==",
        });

        let httpOptions = {
          headers: headers_object
        };

        return this.http.post<any>(`https://remitademo.net/payment/v1/payment/extended/initialize`,data,httpOptions )
            .pipe(map(res => {
                return res;
            }));
    }


}
