import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart/cart';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  imports: [MatIcon, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  cartService = inject(CartService);
}
