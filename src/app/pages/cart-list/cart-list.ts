import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart';
import { CartCard } from "./cart-card/cart-card";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-cart-list',
  imports: [CartCard, MatButtonModule],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  cartService = inject(CartService);
  items = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  async checkoutProducts() {
    alert("Compra realizada por un total de: " + this.totalPrice() + "€");
    await this.cartService.checkoutProducts();
  }
}
