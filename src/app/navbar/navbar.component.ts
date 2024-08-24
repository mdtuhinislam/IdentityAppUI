import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  collapsed = true;

  /**
   *
   */
  constructor(public accService : AccountService) {
    
    
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  logout(){
    this.accService.logout();
  }

}
