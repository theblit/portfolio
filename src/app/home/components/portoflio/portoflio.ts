import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ContentService, Project } from '../../../shared/services/content.service';

@Component({
  selector: 'app-portoflio',
  imports: [NgForOf],
  templateUrl: './portoflio.html',
  styleUrl: './portoflio.css',
})
export class Portoflio implements OnInit {
  projects: Project[] = [];

  private readonly contentService = inject(ContentService);

  ngOnInit(): void {
    this.contentService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
}
