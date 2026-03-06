import { Component, OnInit, inject } from '@angular/core';
import { NgForOf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.services';
import { ApiPaginatedResponse, Article } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-blog',
  imports: [NgForOf, DatePipe, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  posts: Article[] = [];

  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    this.portfolioService.getArticles().subscribe((res: ApiPaginatedResponse<Article>) => {
      this.posts = res.results;
    });
  }
}
