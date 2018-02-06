import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PlansComponent } from './plans/plans.component';
import { HttpModule} from '@angular/http';
import { AuthService } from './services/auth.service';
import { EmployeeDataService } from './services/employee-data.service';
import { PublicPageComponent } from './public-page/public-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlansComponent,
    PublicPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthService,
  EmployeeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
