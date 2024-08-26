import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit{


constructor(private playService : PlayerServiceService){}
message : string='';
  ngOnInit(): void {
    debugger
    this.playService.getPlayer().subscribe({
      
      next : (response : any)=>{
        this.message = response.message;
      }
    });
  }

}
