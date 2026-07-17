import { Component, AfterViewInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sticky-nav',
  templateUrl: './sticky-nav.component.html',
  styleUrls: ['./sticky-nav.component.css']
})
export class StickyNavComponent implements AfterViewInit, OnDestroy {

  sections = ['home', 'about', 'stack', 'contact'];
  activeIndex = 0;
  activeColor = '#313743';
  observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.updateColor(this.sections[this.activeIndex]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObservers();
    }
  }

  initializeObservers() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.activeIndex = this.sections.indexOf(sectionId);
          this.updateColor(sectionId);
        }
      });
    }, options);

    this.sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && this.observer) {
        this.observer.observe(element);
      }
    });
  }

  updateColor(section: string) {
    // Dark dots on light sections, lime dots on the dark stack section
    this.activeColor = section === 'stack' ? '#ccf381' : '#313743';
  }

  scrollToSection(id: string) {
    this.activeIndex = this.sections.indexOf(id);
    if (isPlatformBrowser(this.platformId)) {
      if (id === 'home') {
        // The home section starts below the hero's top margin — go to the real top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // Snap one section per wheel gesture (0.8s cooldown to avoid skipping)
  isScrolling = false;

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling) return;

    this.isScrolling = true;
    setTimeout(() => {
      this.isScrolling = false;
    }, 800);

    if (event.deltaY > 0) {
      this.navigateToNext();
    } else {
      this.navigateToPrevious();
    }
  }

  navigateToNext() {
    if (this.activeIndex < this.sections.length - 1) {
      this.scrollToSection(this.sections[this.activeIndex + 1]);
    }
  }

  navigateToPrevious() {
    if (this.activeIndex > 0) {
      this.scrollToSection(this.sections[this.activeIndex - 1]);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
