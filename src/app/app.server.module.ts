import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CommonModules } from './common/common.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptor';
import { ShakesMenuComponent } from './shakes-menu/shakes-menu.component';

@NgModule({
  imports: [
    AppModule,
    CommonModules,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
  } 
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ],
  declarations: [],
})
export class AppServerModule {}
