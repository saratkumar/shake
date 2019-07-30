import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal'; 
import {Request} from 'express';
// import { LOCAL_STORAGE } from '@ng-toolkit/universal'; 
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {REQUEST} from '@nguniversal/express-engine/tokens';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(LOCAL_STORAGE) private localStorage: any,
        @Optional() @Inject(REQUEST) protected reque: Request
        ) { }

    errorCase(event) {
        switch (event.status) {
            case 401:
                window.location.href = window.location.origin;
                break;
            // case 403:
            //     this.router.navigateByUrl('/forbidden');
            //     break;
            // case 503:
            //     this.router.navigateByUrl('/serviceUnavailable');
            //     break;
            
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let headersObj = {};
        let optimusToken;
        if (isPlatformBrowser(this.platformId)) { 
            optimusToken = this.localStorage.getItem('token');
        }
          
        //let optimusToken = localStorage.getItem('token');
        if(optimusToken) {
            headersObj['x-pressato-auth'] = JSON.parse(optimusToken);
        }   
        request = request.clone({ 
            setHeaders: headersObj
        });

        // if (this.reque) {
        //     let newUrl = `${this.reque.protocol}://${this.reque.get('host')}`;
        //     if (!request.url.startsWith('/')) {
        //         newUrl += '/';
        //     }
        //     newUrl += request.url;
        //     request = request.clone({url: newUrl, setHeaders: headersObj});
        // }
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const temp = event.body && event.body.data ? event.body.data.token : undefined;
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.errorCase(err);
            }
        }));
    }
}
