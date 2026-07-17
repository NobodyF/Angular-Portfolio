import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  /** Navigate to a section on the main page, routing back to '/' first if needed. */
  goTo(sectionId: string, event: Event) {
    event.preventDefault();
    this.closeMenu();
    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          if (sectionId === 'home') {
            // The home section starts below the hero's top margin — go to the real top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  @HostListener('document:click')
  onOutsideClick() {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuOpen = false;
  }
}
