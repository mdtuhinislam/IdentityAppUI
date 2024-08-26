import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ValidationMessageComponent } from './shared/components/errors/validation-message/validation-message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { PlayerComponent } from './Player/player/player.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './shared/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    //NotFoundComponent,
    //ValidationMessageComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
