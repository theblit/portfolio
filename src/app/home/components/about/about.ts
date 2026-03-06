import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio.services';
import { CV } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private readonly portfolioService = inject(PortfolioService);

  downloadCv(): void {
    this.portfolioService.getCvActif().subscribe((cv: CV) => {
      if (cv && cv.fichier) {
        const url = `http://localhost:8000${cv.fichier}`;
        window.open(url, '_blank');
      }
    });
  }
}
