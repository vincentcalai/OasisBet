import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders} from '@angular/common/http';
import { AUTHORIZATION } from '../auth/auth.service';
import { SharedVarService } from '../shared-var.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    public sharedVar: SharedVarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.sharedVar.changeException('');
    let httpHeaders = new HttpHeaders();
    let authorizationToken = localStorage.getItem(AUTHORIZATION);
    console.log("token: ", authorizationToken);
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
