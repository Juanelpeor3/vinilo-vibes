import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Una Signal con los items
  cartItems = signal<any[]>(this.loadCartFromStorage());

  // Suma total de productos
  cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  constructor() {
    // Guarda en localStorage automáticamente
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }

  // Cargar datos iniciales
  private loadCartFromStorage() {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  addToCart(vinyl: any) {
    // Actualiza la signal
    this.cartItems.update(currentCart => {
      const existingItem = currentCart.find(item => item.id === vinyl.id);

      if (existingItem) {
        // Si existe, incrementamos los items
        return currentCart.map(item =>
          item.id === vinyl.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si no existe, lo añadimos al carrito
        return [...currentCart, { ...vinyl, quantity: 1 }];
      }
    });
  }
  // Redondear el precio total a 2 decimales
  totalPrice = computed(() => {
    const total = this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return Math.round(total * 100) / 100;
  });

  // Vaciar el carrito
  clearCart() {
    this.cartItems.set([]);
  }

  // Eliminar un producto por id
  removeItem(productId: string) {
    this.cartItems.update(items => items.filter(i => i.id !== productId));
  }
  updateQuantity(id: number, delta: number) {
    this.cartItems.update(items => {
      return items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          // Evitamos que la cantidad sea menor a 1
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
    });
  }
}
