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


}
