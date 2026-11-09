import { Component, AfterViewInit, OnDestroy, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface NavSection {
  id: string;
  label: string;
  dark: boolean; // section has a dark background → dots switch to light styling
}

@Component({
  selector: 'app-sticky-nav',
  templateUrl: './sticky-nav.component.html',
  styleUrls: ['./sticky-nav.component.css']
})
export class StickyNavComponent implements AfterViewInit, OnDestroy {

  sections: NavSection[] = [
    { id: 'home', label: 'Home', dark: false },
    { id: 'about', label: 'About', dark: false },
    { id: 'stack', label: 'What I work with', dark: true },
    { id: 'contact', label: 'Contact', dark: false }
  ];
  activeIndex = 0;
  observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  get onDark(): boolean {
    return this.sections[this.activeIndex]?.dark ?? false;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObservers();
    }
  }

  initializeObservers() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = this.sections.findIndex(s => s.id === entry.target.id);
          // Run inside Angular's zone so the active dot re-renders
          this.zone.run(() => this.activeIndex = index);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        this.observer!.observe(element);
      }
    });
  }

  scrollToSection(index: number) {
    this.activeIndex = index;
    if (!isPlatformBrowser(this.platformId)) return;

    const id = this.sections[index].id;
    if (id === 'home') {
      // The home section starts below the hero's top margin — go to the real top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
