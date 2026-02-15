import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart/cart';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIcon, RouterLink, MatBadgeModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  cartService = inject(CartService);
}
