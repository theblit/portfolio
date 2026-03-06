export interface Projet {
  id: number;
  titre: string;
  description: string;
  image: string;
  technologies: string;
  lien_github: string;
  lien_demo: string;
  ordre: number;
  est_visible: boolean;
  created_at: string;
}

export interface Competence {
  id: number;
  nom: string;
  categorie: string;
  niveau: number;
  icone: string;
  ordre: number;
}

export interface Article {
  id: number;
  titre: string;
  slug: string;
  contenu: string;
  image_couverture: string;
  categorie: string;
  est_publie: boolean;
  created_at: string;
}

export interface Photo {
  id: number;
  titre: string;
  image: string;
  description: string;
  categorie: string;
  ordre: number;
}

export interface Temoignage {
  id: number;
  nom: string;
  poste: string;
  avatar: string;
  message: string;
  note: number;
  est_visible: boolean;
}

export interface Contact {
  id?: number;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  est_lu?: boolean;
  created_at?: string;
}

export interface VideoYoutube {
  id: number;
  titre: string;
  url_youtube: string;
  youtube_id: string;
  description: string;
  ordre: number;
  est_visible: boolean;
}

export interface CV {
  id: number;
  titre: string;
  fichier: string;
  est_actif: boolean;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  nom: string;
  est_verifie: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface ApiPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

