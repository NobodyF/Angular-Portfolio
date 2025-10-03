import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hyper-text',
  templateUrl: './hyper-text.component.html',
  styleUrls: ['./hyper-text.component.css'],
})
export class HyperTextComponent implements OnInit, OnDestroy {
  @Input() text: string = '';
  @Input() duration: number = 300; // Ensure this is typed as a number
  @Input() animateOnLoad: boolean = true;

  displayText: string[] = [];
  alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  intervalId: any;
  iterations = 0;

  ngOnInit() {
    this.displayText = this.text.split('');
    if (this.animateOnLoad) {
      this.startAnimation();
    }
  }

  startAnimation() {
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
    clearInterval(this.intervalId);
    this.startAnimation();
  }

  ngOnDestroy() {
    // Clear the interval to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
