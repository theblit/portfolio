import { Component, OnInit, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio.services';
import { ApiPaginatedResponse, Temoignage } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-testimonial',
  imports: [],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css',
})
export class Testimonial implements OnInit {
  temoignages: Temoignage[] = [];

  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    this.portfolioService
      .getTemoignages()
      .subscribe((res: ApiPaginatedResponse<Temoignage>) => (this.temoignages = res.results));
  }
}
