import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpService } from './http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from '../app.interceptor';
import { SharedService } from './shared.service';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AppService } from '../app.service';

const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'right',
              distance: 12
          },
          vertical: {
              position: 'top',
              distance: 12,
              gap: 10
          }
      },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        NotifierModule.withConfig(customNotifierOptions)
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        ProductListComponent,
        LoginComponent,
        NewUserComponent,
    ],
    providers: [ HttpService, SharedService, AppService ],
    exports: [
        CommonModule,
        RouterModule,
        FooterComponent,
        HeaderComponent,
        FormsModule,
        LoginComponent,
        NewUserComponent,
        ProductListComponent,
        FormsModule,
        HttpClientModule,
        NotifierModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CommonModules { }