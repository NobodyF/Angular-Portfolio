import { BrowserModule } from '@angular/platform-browser';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { StickyNavComponent } from './sticky-nav/sticky-nav.component';
import { HyperTextComponent } from './hyper-text/hyper-text.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    ProjectsComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    MainPageComponent,
    TechStackComponent,
    StickyNavComponent,
    HyperTextComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  // Angular 21+ defaults to zoneless; this app relies on zone.js change detection
  // (scroll observers, timers, the scramble animation), so opt in explicitly.
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
  bootstrap: [AppComponent]
})
export class AppModule { }
