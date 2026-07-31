import { Component, inject, input, signal } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { CartService } from '../../../services/cart/cart';

@Component({
  selector: 'app-cart-card',
  imports: [MatIcon],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.scss',
})
export class CartCard {
  item = input.required<any>();
  cartService = inject(CartService);

  readonly Math = Math;
}
