import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
constructor(private accountServices : AccountService){}

  ngOnInit(): void {
    
  }
  title = 'IdentityApp';

  refreshUser(){
    const jwt = this.accountServices.getJWT();
    if(jwt){
      this.accountServices.refreshUser(jwt).subscribe({
        next : _ =>{},
        error : _ =>{
          this.accountServices.logout();
        }
      });
    }
    else this.accountServices.refreshUser(null).subscribe();
  }
}
