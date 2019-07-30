import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../shared.service';
import { NotifierService } from 'angular-notifier';
import { LOCAL_STORAGE } from '@ng-toolkit/universal'; 
import { isPlatformBrowser } from '@angular/common';
declare var jQuery: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSideMenu: boolean = false;
  signIn: boolean = false;
  isUserLoggedIn: boolean = false;
  categoryList: Array<any> = [];
  userObj: any;
  orderDetail: any =[]
  orderCount: any;
  categorySelectedMenuIndex: number = -1;
  productSelectedMenuIndex: number = -1;
  categoryId: any;
  productId: any;
  showAddedCartAlert: boolean = false;
  notifier: NotifierService;
  constructor(private appService: AppService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute,
    notifierService: NotifierService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(LOCAL_STORAGE) private localStorage: any
    ) {this.notifier = notifierService; }

  ngOnInit() {
    this.getCategoryList();
    
    this.sharedService.authBehaviourSubj.subscribe(data => {
      let token: string;
      if (isPlatformBrowser(this.platformId)) {
        token = this.localStorage.getItem('token');
      }
      this.isUserLoggedIn = token ? true : false;
      this.isUserLoggedIn && this.getCurrentUserDetail();
    });
    this.sharedService.cartBehaviourSubj.subscribe(data => {
      this.orderCount = data;
    });
    this.sharedService.showNotification.subscribe(data => {
      if(data === 'cart') {
        this.notifier.hideAll();
        this.notifier.notify( 'error', 'Item successfully added to cart.');
      }else if(data === 'signup') {
        this.notifier.hideAll();
        this.notifier.notify( 'success', 'Activation link successfully sent to your mail id.');
      }else if(data === 'subscription') {
        this.notifier.hideAll();
        this.notifier.notify( 'success', 'Subscribed Successfully');
      }else if(data === 'contact') {
        this.notifier.hideAll();
        this.notifier.notify( 'success', 'Thank you for your queries. We will get back to you soon');
      }

    });
    this.sharedService.headerActiveCategoryBehaviourSubj.subscribe(data => {
      this.categorySelectedMenuIndex = data.categorySelectedMenuIndex;
      this.productSelectedMenuIndex = data.productSelectedMenuIndex;
    });
    
  }
  getCurrentUserDetail() {
    this.appService.getCurrentUser((success) => {
      this.userObj = success.data;
      this.sharedService.setUserData(this.userObj);
      this.appService.getCurrentUserOrderDetail((success)=> {
        this.orderCount = success.data;
        this.sharedService.setOrderDetail(this.orderCount);
      }, (error)=> {})
    }, (error)=> {});
  }

  getOrderDetails() {
    throw new Error("Method not implemented.");
  }

  getCategoryList() {
   this.appService.getCategory((success)=> {
      this.categoryList = success.data;
      let tempUrl = this.router.url.split('/');
      this.appService.getProduct((success) => {
        this.sharedService.setProductList(success.data);
        this.categoryList.forEach((category, index) => {
          this.categorySelectedMenuIndex = (this.categorySelectedMenuIndex < 0 && category._id === tempUrl[2]) ? index : this.categorySelectedMenuIndex;
          category.products = success.data.filter(el => el.category === category._id);
          category.products.forEach(product => {
            product.quantity = product.quantity ? product.quantity : 1;
          });
          this.productSelectedMenuIndex = this.productSelectedMenuIndex < 0 ? category.products.findIndex(data => data._id === tempUrl[3]) : this.productSelectedMenuIndex;
        });
        this.sharedService.setCategoryList(this.categoryList);
        
      }, (error) => {
      })
    }, (error)=> {
    });
  }

  openNav() {
    this.showSideMenu = !this.showSideMenu;
    this.showSideMenu ? document.getElementById("mySidenav").style.width = "100%" : document.getElementById("mySidenav").style.width = "0";
  }

  routeToCategoryPage(category:string) {
    this.router.navigateByUrl('/categroy/' + category.replace(' ', '-'));
  }

  onLogout() {
    this.appService.logout((success) => {
      if (isPlatformBrowser(this.platformId)) { 
        this.localStorage.removeItem('token');
      }
      this.sharedService.authBehaviourSubj.next(false);
      this.sharedService.cartBehaviourSubj.next([]);
      this.router.navigateByUrl('');

    }, (error) => {});
  }
}
