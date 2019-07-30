import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/shared.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string;
  email:string;
  phone:any
  listOfCategory: any =[];
  constructor(private sharedService: SharedService,
    private appService: AppService) { }

  ngOnInit() {
    this.sharedService.categoryBehaviourSubj.subscribe(data => {
      this.listOfCategory = data;
      this.listOfCategory.forEach(data => {
        data.hide = data.name.indexOf('package') > -1 ? true : false;
      })
    });
    this.sharedService.headerActiveCategoryBehaviourSubj.next({'categorySelectedMenuIndex': -1, 'productSelectedMenuIndex': -1});
  }

  subscribe() {
    let params = {
      email: this.email,
      name: this.userName,
      phoneNo: this.phone
    }
    this.appService.postSubscription(params, (success) => {
      this.email = '';
      this.userName = '';
      this.phone = '';
      this.sharedService.showNotification.next('subscription')
    }, (error) => {})
  }
}
