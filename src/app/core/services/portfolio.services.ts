import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import {
  ApiPaginatedResponse,
  Article,
  CV,
  Competence,
  Contact,
  Photo,
  Projet,
  Temoignage,
  VideoYoutube,
} from '../models/portfolio.models';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  // PROJETS
  getProjets(): Observable<ApiPaginatedResponse<Projet>> {
    return this.http.get<ApiPaginatedResponse<Projet>>(`${this.api}/projets/`);
  }

  getProjet(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.api}/projets/${id}/`);
  }

  creerProjet(data: Partial<Projet>): Observable<Projet> {
    return this.http.post<Projet>(`${this.api}/projets/`, data);
  }

  modifierProjet(id: number, data: Partial<Projet>): Observable<Projet> {
    return this.http.put<Projet>(`${this.api}/projets/${id}/`, data);
  }

  supprimerProjet(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/projets/${id}/`);
  }

  // COMPETENCES
  getCompetences(): Observable<ApiPaginatedResponse<Competence>> {
    return this.http.get<ApiPaginatedResponse<Competence>>(`${this.api}/competences/`);
  }

  creerCompetence(data: Partial<Competence>): Observable<Competence> {
    return this.http.post<Competence>(`${this.api}/competences/`, data);
  }

  modifierCompetence(id: number, data: Partial<Competence>): Observable<Competence> {
    return this.http.put<Competence>(`${this.api}/competences/${id}/`, data);
  }

  supprimerCompetence(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/competences/${id}/`);
  }

  // ARTICLES
  getArticles(): Observable<ApiPaginatedResponse<Article>> {
    return this.http.get<ApiPaginatedResponse<Article>>(`${this.api}/articles/`);
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.api}/articles/${slug}/`);
  }

  creerArticle(data: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(`${this.api}/articles/`, data);
  }

  modifierArticle(id: number, data: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`${this.api}/articles/${id}/`, data);
  }

  supprimerArticle(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/articles/${id}/`);
  }

  // GALERIE
  getPhotos(): Observable<ApiPaginatedResponse<Photo>> {
    return this.http.get<ApiPaginatedResponse<Photo>>(`${this.api}/galerie/`);
  }

  ajouterPhoto(data: FormData): Observable<Photo> {
    return this.http.post<Photo>(`${this.api}/galerie/`, data);
  }

  supprimerPhoto(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/galerie/${id}/`);
  }

  // TEMOIGNAGES
  getTemoignages(): Observable<ApiPaginatedResponse<Temoignage>> {
    return this.http.get<ApiPaginatedResponse<Temoignage>>(`${this.api}/temoignages/`);
  }

  creerTemoignage(data: Partial<Temoignage>): Observable<Temoignage> {
    return this.http.post<Temoignage>(`${this.api}/temoignages/`, data);
  }

  modifierTemoignage(id: number, data: Partial<Temoignage>): Observable<Temoignage> {
    return this.http.put<Temoignage>(`${this.api}/temoignages/${id}/`, data);
  }

  supprimerTemoignage(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/temoignages/${id}/`);
  }

  // CONTACT
  envoyerContact(nom: string, email: string, sujet: string, message: string): Observable<Contact> {
    return this.http.post<Contact>(`${this.api}/contact/`, { nom, email, sujet, message });
  }

  getMessages(): Observable<ApiPaginatedResponse<Contact>> {
    return this.http.get<ApiPaginatedResponse<Contact>>(`${this.api}/contact/`);
  }

  // VIDEOS
  getVideos(): Observable<ApiPaginatedResponse<VideoYoutube>> {
    return this.http.get<ApiPaginatedResponse<VideoYoutube>>(`${this.api}/videos/`);
  }

  ajouterVideo(data: Partial<VideoYoutube>): Observable<VideoYoutube> {
    return this.http.post<VideoYoutube>(`${this.api}/videos/`, data);
  }

  modifierVideo(id: number, data: Partial<VideoYoutube>): Observable<VideoYoutube> {
    return this.http.put<VideoYoutube>(`${this.api}/videos/${id}/`, data);
  }

  supprimerVideo(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/videos/${id}/`);
  }

  // CV
  getCvActif(): Observable<CV> {
    return this.http.get<CV>(`${this.api}/cv/actif/`);
  }

  uploaderCv(file: File): Observable<CV> {
    const formData = new FormData();
    formData.append('fichier', file);
    formData.append('titre', file.name);
    formData.append('est_actif', 'true');
    return this.http.post<CV>(`${this.api}/cv/`, formData);
  }
}

