import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileService } from '../../services/profile/profile';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, MatMenuModule, MatProgressSpinner],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnDestroy {
  cartService = inject(CartService);
  profileService = inject(ProfileService);
  constructor(private router: Router) { }
  profile = signal<any>(null);

  isLoading = signal(true);
  isSlow = signal(false);
  private slowTimer: ReturnType<typeof setTimeout> | null = null;

  async ngOnInit() {
    this.slowTimer = setTimeout(() => this.isSlow.set(true), 3000);

    const { data } = await this.profileService.getProfile();

    if (data) {
      this.profile.set(data);
    }
    this.isLoading.set(false);
    if (this.slowTimer) clearTimeout(this.slowTimer);
    this.isSlow.set(false);
  }

  ngOnDestroy() {
    if (this.slowTimer) clearTimeout(this.slowTimer);
  }

  signOut() {
    this.cartService.clearCart();
    this.profileService.signOut();
    this.router.navigate(["/auth/login"]);
  }
  navigateToAdmin() {
    this.router.navigate(["/dashboard"]);
  }
}