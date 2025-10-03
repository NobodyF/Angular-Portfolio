import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  sections = ['header', 'about', 'projects', 'contact']; // Same sections for scroll
  activeIndex = 0;
  isScrolling = false; // Prevents skipping multiple sections
  observer: IntersectionObserver | null = null; // IntersectionObserver instance

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObservers(); // Initialize the observer in the browser
    }
  }

  // Initialize the IntersectionObserver to track the sections
  initializeObservers() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the section is in the viewport
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.activeIndex = this.sections.indexOf(sectionId); // Update active section index
        }
      });
    }, options);

    // Observe all sections for active tracking
    this.sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && this.observer) {
        this.observer.observe(element);
      }
    });
  }

  // Scroll to the specific section
  scrollToSection(id: string) {
    if (this.sections[this.activeIndex] === id) return; // Prevent jump scroll if the section is active

    this.activeIndex = this.sections.indexOf(id);
    this.router.navigate(['/', id]); // Update route without page reload

    // Wait a moment to allow the router to update and then scroll smoothly
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  ngOnDestroy() {
    // Cleanup observer on destroy to avoid memory leaks
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
