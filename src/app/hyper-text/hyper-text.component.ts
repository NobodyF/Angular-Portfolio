import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hyper-text',
  templateUrl: './hyper-text.component.html',
  styleUrls: ['./hyper-text.component.css'],
})
export class HyperTextComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = '';
  @Input() duration: number = 300;
  @Input() animateOnLoad: boolean = true;
  /** Play the scramble the first time the text scrolls into view (instead of on load). */
  @Input() animateOnView: boolean = false;

  displayText: string[] = [];
  alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  intervalId: any;
  iterations = 0;
  private observer: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private host: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.displayText = this.text.split('');
    // Animate in the browser only — on the server, render the final text so
    // prerendered/SSR HTML never shows a half-scrambled snapshot.
    if (this.animateOnLoad && !this.animateOnView && isPlatformBrowser(this.platformId)) {
      this.startAnimation();
    }
  }

  ngAfterViewInit() {
    if (!this.animateOnView || !isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) return;
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        // Inside the zone so each scramble tick triggers change detection
        this.zone.run(() => this.startAnimation());
        this.observer?.disconnect();
      }
    }, { threshold: 0.6 });
    this.observer.observe(this.host.nativeElement);
  }

  startAnimation() {
    clearInterval(this.intervalId);
    this.iterations = 0;
    this.intervalId = setInterval(() => {
      if (this.iterations < this.text.length) {
        this.displayText = this.displayText.map((char, index) =>
          char === ' '
            ? ' '
            : index <= this.iterations
            ? this.text[index]
            : this.alphabets[this.getRandomInt(26)]
        );
        this.iterations += 0.1;
      } else {
        clearInterval(this.intervalId);
      }
    }, this.duration / (this.text.length * 10));
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  onMouseEnter() {
    this.startAnimation();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.observer?.disconnect();
  }
}
