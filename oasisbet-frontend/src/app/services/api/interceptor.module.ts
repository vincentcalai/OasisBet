import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AUTHORIZATION } from '../auth/auth.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(

  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders();
    let authorizationToken = sessionStorage.getItem(AUTHORIZATION);
    if(authorizationToken){
      httpHeaders = httpHeaders.append('Authorization', authorizationToken);
    }
    const xhr = req.clone({
      headers: httpHeaders
    });
    return next.handle(xhr);
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})

export class InterceptorModule {}
