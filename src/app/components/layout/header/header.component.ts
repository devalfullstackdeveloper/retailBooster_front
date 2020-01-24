import { Component, OnInit , HostListener, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: any = "" ;
  userData:any;
  
  constructor(
  	private router: Router,
    private route: ActivatedRoute
    ,@Inject(DOCUMENT) private document: Document) { }

@HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 ||     
    document.documentElement.scrollTop > 20) {
      document.getElementById('header_area').classList.add('navbar_fixed');
    }
    else
    {
      document.getElementById('header_area').classList.remove('navbar_fixed');
    }
  }
  name = 'Angular';

 ngOnInit() {
    this.currentRoute = this.router.url;
    this.router.events.subscribe((res) => {
        this.currentRoute = this.router.url;
    })

    if(localStorage.getItem("user")) {
      let user = localStorage.getItem("user");
      this.userData = JSON.parse(user);
    }

  }

  logOut() {
    this.userData = null;
    localStorage.clear();
  }

}
