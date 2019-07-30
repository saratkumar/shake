import { Component, OnInit, PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { isPlatformBrowser } from '@angular/common';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  categoryBehaviourSubj = new BehaviorSubject([]);
  authBehaviourSubj = new BehaviorSubject(false);
  cartBehaviourSubj = new BehaviorSubject([]);
  showNotification = new BehaviorSubject('');
  headerActiveCategoryBehaviourSubj = new BehaviorSubject({ 'categorySelectedMenuIndex': -1, 'productSelectedMenuIndex': -1 });
  categoryList: Array<any> = [];
  orderDetail: any = [];
  userData: any;
  productList: any;
  constructor(private appService: AppService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any) { }


  setCategoryList(categoryList) {
    this.categoryList = categoryList;
    this.categoryBehaviourSubj.next(this.categoryList)
  }

  getCategoryList() {
    return this.categoryList;
  }

  setProductList(products) {
    this.productList = products;
  }

  getProductList() {
    return this.productList;
  }

  setAuth(authDetails: any) {
    this.authBehaviourSubj.next(true);
  }

  setOrderDetail(orderDetail) {
    this.orderDetail = orderDetail;
    this.cartBehaviourSubj.next(orderDetail);
  }

  getOrderDetail() {
    return this.orderDetail;
  }

  setUserData(userObj) {
    this.userData = userObj;
  }

  getUserData() {
    return this.userData;
  }

  addItemToCart(product) {
    let params = this.orderDetail.carts.find(data => data.product === product._id);
    let method;
    if (params) {
      params.quantity = product.quantity;
      method = 'updateCart';
    } else {
      method = 'postAddToCart';
      params = { "isDeleted": false, "isBilled": false, "quantity": product.quantity, "additionalNotes": "", "address": "5cbe10be2771967f4327f3d4", "user": this.userData._id, "product": product._id }
    }

    this.appService[method](params, (successFn) => {
      this.appService.getCurrentUserOrderDetail((success) => {
        this.cartBehaviourSubj.next(success.data);
        if (method === 'postAddToCart') {
          this.showNotification.next('cart');
        }
      }, (error) => { });
    }, (error) => { });

  }

  ScrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }
}
