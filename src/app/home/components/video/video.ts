import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.services';
import { ApiPaginatedResponse, VideoYoutube } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-video',
  imports: [CommonModule],
  templateUrl: './video.html',
  styleUrl: './video.css',
})
export class Video implements OnInit {
  videos: VideoYoutube[] = [];

  private readonly portfolioService = inject(PortfolioService);

  ngOnInit(): void {
    this.portfolioService
      .getVideos()
      .subscribe((res: ApiPaginatedResponse<VideoYoutube>) => (this.videos = res.results));
  }
}
