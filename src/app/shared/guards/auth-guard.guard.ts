import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../models/register';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private accountService:AccountService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          return true;
        } else {
          //this.sharedService.showNotification(false, 'Restricted Area', 'Leave immediately!');
          this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    );
  }
  
}



// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { AccountService } from '../../account/account.service';
// import { map, Observable } from 'rxjs';
// import { User } from '../models/register';

// export class authGuardGuard{
//   constructor(private accountService : AccountService,
//     private rout : Router
//   ){}
//   CanActivate(route: ActivatedRouteSnapshot,
//     state : RouterStateSnapshot
//   ): Observable<boolean>{
//     return this.accountService.user$.pipe(
//       map((user : User | null)=>{
//         if(user){
//           return true;
//         }
//         else{
//           this.rout.navigate(['account/login'], {queryParams : {returnUrl: state.url}})
//           return false;
//         }
//       })
//     );
//   }
// }
