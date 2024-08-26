import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { IdentityCaptureComponent } from './identity-capture/identity-capture.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TempPassComponent } from './temp-pass/temp-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { PhotoUploadService } from './services/photo-upload.service';
import { RegisterGuestService } from './services/register-guest.service';
import { HomeService } from './services/home.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { GatePassComponent } from './gate-pass/gate-pass.component'; 




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    ConfirmationPageComponent,
    SideBarComponent,
    IdentityCaptureComponent,
    CheckoutComponent,
    TempPassComponent,
    GatePassComponent,
    // MatIconModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [HomeService, PhotoUploadService, RegisterGuestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
