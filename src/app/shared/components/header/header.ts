import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isDarkTheme = signal(false);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const dark = this.isDarkTheme();
      const themeLink = document.getElementById('optional-theme') as HTMLLinkElement | null;
      if (themeLink) {
        themeLink.href = dark ? './assets/css/dark.theme.css' : './assets/css/light.theme.css';
      }
    });
  }

  toggleTheme(): void {
    this.isDarkTheme.update((value) => !value);
  }

}
