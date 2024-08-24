import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Register, User } from '../shared/models/register';
import { environment } from '../../environments/environment.development';
import { map, of, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 private userSource = new ReplaySubject<User | null>(1);
 user$ = this.userSource.asObservable();


  constructor(private http : HttpClient,
    private router : Router
  ) { }

  register(register : Register){
    return this.http.post(`${environment.apiUrl}Account/register`,register);
  }
  login(login : Login){
    return this.http.post<User>(`${environment.apiUrl}Account/login`, login).pipe(map((user : User)=>{
      if(user){
        this.setUser(user);
        this.router.navigateByUrl('');
        //return user;
      }
      //return null;
    }));
  }
  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('account/login');

  }
  private setUser(user : User){
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
  getJWT(){
    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user:User = JSON.parse(key);
      return user.jwt;
    }
    else return null;
  }
  refreshUser(jwt : string | null){
    if(jwt === null){
      this.userSource.next(null);
      return of(undefined);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' +jwt);
    return this.http.get<User>(`${environment.apiUrl}/account/refresh-user-token`,{headers}).pipe(
      map((user : User)=>{
        if(user)
          this.setUser(user);
      })
    );


  }
  public getHttpHeder(jwt : string | null){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' +jwt);
    return headers;
  }
}
