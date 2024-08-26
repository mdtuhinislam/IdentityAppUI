import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { Injectable } from '@angular/core';
@Injectable()
export class jwtInterceptor implements HttpInterceptor{

  constructor(private accService : AccountService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accService.user$.pipe(take(1)).subscribe({
      next : user=>{
        if(user){
          req = req.clone({
            setHeaders :{
              Authorization : `Bearer ${user.jwt}`
            }
          });
        }
      }
    });
    return next.handle(req);
  }

}