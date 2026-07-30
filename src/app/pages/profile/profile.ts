import { Component, inject, signal } from '@angular/core';
import { supabase } from '../../supabase';
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
  imports: [CommonModule, MatButtonModule, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatIconModule, RouterModule, MatMenuModule, MatProgressSpinner],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  cartService = inject(CartService);
  profileService = inject(ProfileService);
  constructor(private router: Router) { }
  profile = signal<any>(null);

  isLoading = signal(true);

  async ngOnInit() {

    const { data } = await this.profileService.getProfile();

    if (data) {
      // Actualiza el signal
      this.profile.set(data);
      this.isLoading.set(false);
    }
  }

  // Función para cerrar sesión
  signOut() {
    this.cartService.clearCart();
    this.profileService.signOut();
    this.router.navigate(["/auth/login"]);
  }
  navigateToAdmin() {
    this.router.navigate(["/dashboard"]);
  }
}
