import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PortfolioService } from '../../../core/services/portfolio.services';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  sending = false;
  successMessage = '';
  errorMessage = '';

  private readonly portfolioService = inject(PortfolioService);

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.sending = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { name, email, subject, message } = form.value;

    this.portfolioService.envoyerContact(name, email, subject, message).subscribe({
      next: () => {
        this.sending = false;
        this.successMessage = 'Message envoyé !';
        form.resetForm();
      },
      error: () => {
        this.sending = false;
        this.errorMessage = 'Erreur, réessayez.';
      },
    });
  }
}
