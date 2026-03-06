import { Component, OnInit, inject } from '@angular/core';
import { NgForOf, DatePipe } from '@angular/common';
import { BlogPost, ContentService } from '../../../shared/services/content.service';

@Component({
  selector: 'app-blog',
  imports: [NgForOf, DatePipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  posts: BlogPost[] = [];

  private readonly contentService = inject(ContentService);

  ngOnInit(): void {
    this.contentService.getBlogPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
