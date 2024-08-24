import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  constructor(private http : HttpClient, private accountService : AccountService) { }

  getPlayer(){
    return this.http.get(`${environment.apiUrl}play/get-players`,);
  }
 
}
