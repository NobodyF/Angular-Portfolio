import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  /**
   * Build and open a `mailto:` URL so that the user’s default mail client
   * (Outlook, Apple Mail, etc.) opens with pre-filled fields.
   */
  openMailClient(form: { name: string; email: string; subject: string; message: string }) {
    const to     = 'proectgame@gmail.com';  // <-- replace with your real address
    const subject= encodeURIComponent(form.subject);
    // Prepend the user’s own email so you can see their address in the body as well:
    const body   = encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.message}`
    );

    // Construct mailto URL
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;

    // Trigger the mail client
    window.location.href = mailtoUrl;
  }
}
