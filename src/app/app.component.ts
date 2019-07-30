import { Component } from '@angular/core';
import { SharedService } from './common/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pressato';
  constructor(private sharedService: SharedService) {}

  onActivate(event) {
   this.sharedService.ScrollToTop();
  }
}