import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  type: string;
  link: string;
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  link: string;
  source: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('assets/data/projects.json');
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>('assets/data/blog-posts.json');
  }
}

