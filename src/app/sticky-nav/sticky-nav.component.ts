import { Component, HostListener, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sticky-nav',
  templateUrl: './sticky-nav.component.html',
  styleUrls: ['./sticky-nav.component.css']
})
export class StickyNavComponent implements AfterViewInit {

  sections = ['header', 'about', 'projects', 'contact'];
  activeIndex = 0;
  activeColor = '#313743'; // Default color for active section
  isScrolling = false; // Prevents skipping multiple pages
  observer: IntersectionObserver | null = null; // Initialize as null

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.updateColor(this.sections[this.activeIndex]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObservers(); // Initialize IntersectionObserver only in the browser
    }
  }

  initializeObservers() {
    // Setup an observer to track which section is currently in the viewport
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when section is 50% visible
    };

    // Initialize the observer only if we are in the browser
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Update active section if a section is in view
          const sectionId = entry.target.id;
          this.activeIndex = this.sections.indexOf(sectionId);
          this.updateColor(sectionId);
        }
      });
    }, options);

    // Observe all sections for intersection
    this.sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && this.observer) {
        this.observer.observe(element);
      }
    });
  }

  updateColor(section: string) {
    // Update the color of the active navigation item
    if (section === 'header') {
      this.activeColor = '#313743'; // Home Color
    } else if (section === 'about') {
      this.activeColor = '#313743'; // About Color
    } else if (section === 'projects') {
      this.activeColor = '#ccf381'; // Projects Color
    } else if (section === 'contact') {
      this.activeColor = '#313743'; // Contact Color
    }
  }

  scrollToSection(id: string) {
    // Scroll to the specified section and update the router path
    this.activeIndex = this.sections.indexOf(id);
    this.router.navigate(['/', id]); // No page reload

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    // Prevent scrolling multiple sections rapidly
    if (this.isScrolling) return;

    this.isScrolling = true;
    setTimeout(() => {
      this.isScrolling = false;
    }, 800); // 0.8s delay to prevent rapid skips

    if (event.deltaY > 0) {
      // Scroll down: Navigate to next section
      this.navigateToNext();
    } else {
      // Scroll up: Navigate to previous section
      this.navigateToPrevious();
    }
  }

  navigateToNext() {
    if (this.activeIndex < this.sections.length - 1) {
      this.activeIndex++;
      this.scrollToSection(this.sections[this.activeIndex]);
    }
  }

  navigateToPrevious() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.scrollToSection(this.sections[this.activeIndex]);
    }
  }

  ngOnDestroy() {
    // Cleanup the observer on destroy to avoid memory leaks
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
