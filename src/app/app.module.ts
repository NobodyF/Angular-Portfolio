import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';  // Add HttpClientModule and withFetch
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StickyNavComponent } from './sticky-nav/sticky-nav.component';
import { HyperTextComponent } from './hyper-text/hyper-text.component';
import { FormsModule } from '@angular/forms';  // <-- Add this import


@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    ProjectsComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    StickyNavComponent,
    HyperTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // Add HttpClientModule
    FormsModule
  ],
  providers: [provideHttpClient(withFetch())],  // Enable Fetch API
  bootstrap: [AppComponent]
})
export class AppModule { }
