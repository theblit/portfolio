import { Routes } from '@angular/router';
import { Home } from './home/home';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

// Remplace ces composants par tes vrais composants Angular
// import { ProjetsComponent } from './projets/projets.component';
// import { ArticlesComponent } from './articles/articles.component';
// import { ArticleDetailComponent } from './articles/article-detail.component';
// import { ContactComponent } from './contact/contact.component';
// import { LoginComponent } from './auth/login.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard.component';
// import { AdminProjetsComponent } from './admin/admin-projets.component';
// import { AdminArticlesComponent } from './admin/admin-articles.component';
// import { AdminMessagesComponent } from './admin/admin-messages.component';
// import { AdminCvComponent } from './admin/admin-cv.component';

export const routes: Routes = [
  // routes publiques
  { path: '', component: Home },
  // { path: 'projets', component: ProjetsComponent },
  // { path: 'articles', component: ArticlesComponent },
  // { path: 'articles/:slug', component: ArticleDetailComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'login', component: LoginComponent },

  // routes protégées admin
  // {
  //   path: 'admin',
  //   canActivate: [authGuard, adminGuard],
  //   component: AdminDashboardComponent,
  // },
  // {
  //   path: 'admin/projets',
  //   canActivate: [authGuard, adminGuard],
  //   component: AdminProjetsComponent,
  // },
  // {
  //   path: 'admin/articles',
  //   canActivate: [authGuard, adminGuard],
  //   component: AdminArticlesComponent,
  // },
  // {
  //   path: 'admin/messages',
  //   canActivate: [authGuard, adminGuard],
  //   component: AdminMessagesComponent,
  // },
  // {
  //   path: 'admin/cv',
  //   canActivate: [authGuard, adminGuard],
  //   component: AdminCvComponent,
  // },

  { path: '**', redirectTo: '' },
];