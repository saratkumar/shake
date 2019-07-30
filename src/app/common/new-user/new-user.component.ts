import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { AppService } from '../../app.service';
import { SharedService } from '../shared.service';
declare var jQuery:any; 
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})


export class NewUserComponent implements OnInit {
  newUserObj:any = {};
  showTermsandConditionsError: boolean = false;
  showPasswordError: boolean = false;
  form: Form
  @Output() signIn = new EventEmitter();
  constructor(
    private appService: AppService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.newUserObj = {};
  }

  onSignIn() {
    this.signIn.emit();
  }

  onSignUp() {
    this.showTermsandConditionsError = false;
    this.showPasswordError = false;
    if(this.newUserObj.termsAndConditions && this.passwordCheck()) {
      this.appService.postNewUser(this.newUserObj, (success) => {
        
        jQuery("#myModal").modal("hide");
        this.sharedService.showNotification.next('signup')
      }, (error) => {});
    } else if(!this.newUserObj.termsAndConditions){
      this.showTermsandConditionsError = true;
    } else {
      this.showPasswordError = true;
    } 
  }

  passwordCheck() {
    return this.newUserObj.password === this.newUserObj.confirmPassword;
  }

}
