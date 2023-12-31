import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { MainSecComponent } from './main-sec/main-sec.component';
import { FooterComponent } from './footer/footer.component';
import { OnlineSportsbookComponent } from './online-sportsbook/online-sportsbook.component';
import { OnlineCasinoSoftwareComponent } from './online-casino-software/online-casino-software.component';
import { Header2Component } from './header2/header2.component';
import { LiveCasinoComponent } from './live-casino/live-casino.component';
import { Footers2Component } from './footers2/footers2.component';
import { CasinoGamesComponent } from './casino-games/casino-games.component';
import { LotteryGamesComponent } from './lottery-games/lottery-games.component';
import { CasinoTournamentComponent } from './casino-tournament/casino-tournament.component';
import { WhitelabelComponent } from './whitelabel/whitelabel.component';
import { WhitecasinoComponent } from './whitecasino/whitecasino.component';
import { ContactComponent } from './contact/contact.component';

import { IFrameComponent } from './i-frame/i-frame.component';

import { Header3Component } from './header3/header3.component';
import { SportbetComponent } from './sportbet/sportbet.component';

import { EsportComponent } from './esport/esport.component';
import { MobileComponent } from './mobile/mobile.component';
import { AboutComponent } from './about/about.component';
import { ContactComComponent } from './contact-com/contact-com.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FAQComponent } from './faq/faq.component';
import { ScrollBtnComponent } from './scroll-btn/scroll-btn.component';
import { OurThemeComponent } from './our-theme/our-theme.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


import { RiskManagementComponent } from './risk-management/risk-management.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PaymentProviderComponent } from './payment-provider/payment-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainSecComponent,
    FooterComponent,
    OnlineSportsbookComponent,
    OnlineCasinoSoftwareComponent,
    Header2Component,
    LiveCasinoComponent,
    Footers2Component,
    CasinoGamesComponent,
    LotteryGamesComponent,
    CasinoTournamentComponent,
    WhitelabelComponent,
    WhitecasinoComponent,
    ContactComponent,
    IFrameComponent,

    Header3Component,
    SportbetComponent,
 
    EsportComponent,
    MobileComponent,
    AboutComponent,
    ContactComComponent,
    FAQComponent,
    ScrollBtnComponent,
    OurThemeComponent,
    PrivacyPolicyComponent,
    RiskManagementComponent,
    ErrorPageComponent,
    PaymentProviderComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
