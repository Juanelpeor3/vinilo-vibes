import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart';
import { CartCard } from "./cart-card/cart-card";

@Component({
  selector: 'app-cart-list',
  imports: [CartCard],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  cartService = inject(CartService);
  items = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  buyVinils() {
    alert('Compra realizada por un total de: ' + this.totalPrice());
    this.cartService.clearCart();
  }
}
