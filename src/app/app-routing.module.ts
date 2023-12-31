import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSecComponent } from './main-sec/main-sec.component';
import { OnlineSportsbookComponent } from './online-sportsbook/online-sportsbook.component';
import { OnlineCasinoSoftwareComponent } from './online-casino-software/online-casino-software.component';
import { LiveCasinoComponent } from './live-casino/live-casino.component';
import { CasinoGamesComponent } from './casino-games/casino-games.component';
import { LotteryGamesComponent } from './lottery-games/lottery-games.component';
import { CasinoTournamentComponent } from './casino-tournament/casino-tournament.component';
import { WhitelabelComponent } from './whitelabel/whitelabel.component';
import { WhitecasinoComponent } from './whitecasino/whitecasino.component';
import { ContactComponent } from './contact/contact.component';
import { IFrameComponent } from './i-frame/i-frame.component';

import { SportbetComponent } from './sportbet/sportbet.component';
import { EsportComponent } from './esport/esport.component';
import { MobileComponent } from './mobile/mobile.component';
import { AboutComponent } from './about/about.component';
import { FAQComponent } from './faq/faq.component';
import { ScrollBtnComponent } from './scroll-btn/scroll-btn.component';
import { OurThemeComponent } from './our-theme/our-theme.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RiskManagementComponent } from './risk-management/risk-management.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PaymentProviderComponent } from './payment-provider/payment-provider.component';
let useHashData = true;

const routes: Routes = [
  {path:'',component:MainSecComponent},
  {path:'online-exchangebook-software',component:OnlineSportsbookComponent},
  {path:'online-casino-software',component:OnlineCasinoSoftwareComponent},
  {path:'casino/live-casino',component:LiveCasinoComponent},
  {path:'casino/casino-games',component:CasinoGamesComponent},
  {path:'casino/lottery-games',component:LotteryGamesComponent},
  {path:'casino/tournaments',component:CasinoTournamentComponent},
  {path:'white-label-betting-platform',component:WhitelabelComponent},
  {path:'casino',component:WhitecasinoComponent},

  {path:'contact',component:ContactComponent},
  
  {path:'exchangebook-iframe', component:IFrameComponent},

  {path:'sports-betting-software', component:SportbetComponent},

  {path:'sports-betting-software/esports-betting-software',component:EsportComponent},
  {path:'sports-betting-software/mobile-betting-software',component:MobileComponent},
  {path:'about-us',component:AboutComponent},
  {path:'FAQ',component:FAQComponent},
  {path:'our-theme', component:OurThemeComponent},
  {path:'scroll-btn', component:ScrollBtnComponent},
  {path:'scroll-btn', component:ScrollBtnComponent},
  {path:'privacy-policy',component:PrivacyPolicyComponent},
  {path:'risk-management', component:RiskManagementComponent},
  {path:'payment', component:PaymentProviderComponent},
  {path:'**',component:ErrorPageComponent}









];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
