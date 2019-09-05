import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { CommonModules } from './common/common.module';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AppService } from './app.service';
import { ShakesMenuComponent } from './shakes-menu/shakes-menu.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'shakes' }),
    FormsModule,
    CommonModules,
    AppRoutingModule,
    NgtUniversalModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ShakesMenuComponent
  ],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
