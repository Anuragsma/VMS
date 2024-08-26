import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { IdentityCaptureComponent } from './identity-capture/identity-capture.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TempPassComponent } from './temp-pass/temp-pass.component';
import { GatePassComponent } from './gate-pass/gate-pass.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'side-bar', component: SideBarComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'confirmation-page',  component: ConfirmationPageComponent },
  { path: 'identity-capture', component: IdentityCaptureComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'temp-pass', component: TempPassComponent },
  { path: 'gate-pass', component: GatePassComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

