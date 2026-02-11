import { Component, signal } from '@angular/core';
import { supabase } from '../../supabase';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileService } from '../../services/profile/profile';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatButtonModule, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatIconModule, RouterModule, MatMenuModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(private router: Router, private profileService: ProfileService) { }
  profile = signal<any>(null);
  async ngOnInit() {
    // Verifica si el usuario está autenticado
    if (!(await this.profileService.getSession()).data.session) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const { data } = await this.profileService.getProfile();

    if (data) {
      // Actualiza el signal
      this.profile.set(data);
    }
  }

  // Función para cerrar sesión
  signOut() {
    this.profileService.signOut();
    this.router.navigate(['/auth/login']);
  }
  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
