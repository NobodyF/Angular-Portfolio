import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: false
})
export class ContactComponent {
  readonly email = 'proectgame@gmail.com';
  copied = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Build and open a `mailto:` URL so the visitor's default mail client
   * opens with the fields pre-filled.
   */
  openMailClient(form: { name: string; email: string; subject: string; message: string }) {
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
  }

  /** Fallback for visitors without a configured mail app. */
  copyEmail() {
    if (!isPlatformBrowser(this.platformId) || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.email).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }).catch(() => { /* clipboard blocked — the address is still visible to copy manually */ });
  }
}
