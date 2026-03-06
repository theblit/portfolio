import { Component, OnInit, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio.services';
import { ApiPaginatedResponse, Competence } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume implements OnInit {
  competences: Competence[] = [];

  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    this.portfolioService
      .getCompetences()
      .subscribe((res: ApiPaginatedResponse<Competence>) => (this.competences = res.results));
  }
}
