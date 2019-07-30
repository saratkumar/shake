import { Component, OnInit, HostListener } from '@angular/core';
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
  header: any;
  sticky:any;
  stickyHeaderEnabled: boolean = false;
  constructor(private sharedService: SharedService,
    private appService: AppService) { }

  ngOnInit() {
    this.header = document.getElementById("myHeader");
    this.sticky = this.header.offsetTop;  
  }
  
  @HostListener('window:scroll', ['$event']) scrollHandler($event) {
    this.stickyHeaderEnabled = window.pageYOffset > this.sticky ? true : false;
  }

}
