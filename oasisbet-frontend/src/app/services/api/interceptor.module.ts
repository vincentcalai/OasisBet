import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SharedVarService } from '../shared-var.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    public sharedVar: SharedVarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})

export class InterceptorModule {}
