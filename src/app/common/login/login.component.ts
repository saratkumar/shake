import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../app.service';
import { SharedService } from '../shared.service';
declare var jQuery:any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  params: Object = {};
  showError: boolean = false;
  @Output() signUp = new EventEmitter();
  constructor(
    private appService: AppService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  onSignUp() {
    this.signUp.emit();
  }
  

  onLoginIn() {
    this.appService.postLoginUser(this.params, (success) => {
      localStorage.setItem('token', JSON.stringify(success.data.authToken));
      this.sharedService.authBehaviourSubj.next(true);
      jQuery("#myModal").modal("hide");
    }, (error)=> {
      this.showError = true;
    });
  }

}
