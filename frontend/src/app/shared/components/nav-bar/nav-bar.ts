import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CartService } from '../../../services/cart/cart';
import { MatIcon } from "@angular/material/icon";
import { RouterLink, Router } from "@angular/router";
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIcon, RouterLink, MatBadgeModule, FormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  cartService = inject(CartService);
  private router = inject(Router);

  searchOpen = false;
  searchQuery = '';

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      this.searchQuery = '';
      setTimeout(() => this.searchInput?.nativeElement?.focus(), 50);
    }
  }

  closeSearch() {
    this.searchOpen = false;
    this.searchQuery = '';
  }

  doSearch() {
    const q = this.searchQuery.trim();
    if (q) {
      this.router.navigate(['/collections/vinyls'], { queryParams: { q } });
    }
    this.closeSearch();
  }
}
