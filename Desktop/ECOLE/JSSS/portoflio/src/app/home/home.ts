import { Component } from '@angular/core';
import { Resume } from './components/resume/resume';
import { About } from './components/about/about';
import { Blog } from './components/blog/blog';
import { Fact } from './components/fact/fact';
import { Introduction } from './components/introduction/introduction';
import { Contact } from './components/contact/contact';
import { Preloader } from '../shared/components/preloader/preloader';
import { Project } from './components/project/project';
import { Service } from './components/service/service';
import { Testimonial } from './components/testimonial/testimonial';
import { Video } from './components/video/video';
import { Portoflio } from './components/portoflio/portoflio';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Footer,
   About,
   Blog,
   Fact,
   Introduction,
   Portoflio,
   Service,
   Testimonial,
   Video,
   Contact,
   Preloader,
   Project,
   Resume

  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
