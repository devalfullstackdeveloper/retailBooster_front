import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/site/home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/site/aboutus/aboutus.component';
import { FaqComponent } from './components/site/faq/faq.component';
import { ContactusComponent } from './components/site/contactus/contactus.component';
import { ApplyComponent } from './components/site/apply/apply.component';
import { SignupComponent } from './components/site/signup/signup.component';
import { LoginComponent } from './components/site/login/login.component';
import { FormsModule }   from '@angular/forms';
import { BuycreditComponent } from './components/site/buycredit/buycredit.component';
import { LoanstatusComponent } from './components/site/loanstatus/loanstatus.component';
import { TransactionComponent } from './components/site/transaction/transaction.component';
import { RepaymentComponent } from './components/site/repayment/repayment.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './services/api.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about-us', component: AboutusComponent},
  { path: 'contact-us', component: ContactusComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'apply', component: ApplyComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'buycredit', component: BuycreditComponent},
  { path: 'loanstatus', component: LoanstatusComponent},
  { path: 'transaction', component: TransactionComponent},
  { path: 'repayment', component: RepaymentComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent,
    FaqComponent,
    ContactusComponent,
    ApplyComponent,
    SignupComponent,
    LoginComponent,
    BuycreditComponent,
    LoanstatusComponent,
    TransactionComponent,
    RepaymentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }