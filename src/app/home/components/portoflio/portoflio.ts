import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.services';
import { ApiPaginatedResponse, Projet } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-portoflio',
  imports: [NgForOf],
  templateUrl: './portoflio.html',
  styleUrl: './portoflio.css',
})
export class Portoflio implements OnInit {
  projects: Projet[] = [];

  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    this.portfolioService.getProjets().subscribe((res: ApiPaginatedResponse<Projet>) => {
      this.projects = res.results;
    });
  }
}
