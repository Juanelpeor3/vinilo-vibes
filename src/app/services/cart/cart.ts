import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { VinylService } from '../vinyl/vinyl';

/**
 * Servicio encargado de gestionar el carrito de compras de Vinilo Vibes.
 * * @remarks
 * Este servicio utiliza **Signals** de Angular para un manejo de estado reactivo y eficiente.
 * Los datos se sincronizan automáticamente con `localStorage` para persistir el carrito
 * tras recargar la página.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** Servicio de vinilos inyectado para gestionar stock */
  vinilService = inject(VinylService);

  /** Lista reactiva de productos en el carrito. */
  cartItems = signal<any[]>(this.loadCartFromStorage());

  /**
   * Cantidad total de productos individuales en el carrito.
   * Se recalcula automáticamente cuando cambian los items.
   */
  cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  /**
   * Precio total acumulado de los productos en el carrito.
   * @remarks El valor se redondea a dos decimales para evitar errores de precisión de punto flotante.
   */
  totalPrice = computed(() => {
    const total = this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return Math.round(total * 100) / 100;
  });

  constructor() {
    /**
     * Efecto que guarda automáticamente el estado del carrito en el almacenamiento local
     * cada vez que la señal `cartItems` sufre un cambio.
     */
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }

  /**
   * Recupera los datos del carrito guardados en el navegador.
   * @returns Un array con los items recuperados o un array vacío si no hay datos.
   */
  private loadCartFromStorage() {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Añade un vinilo al carrito o incrementa su cantidad si ya existe.
   * * @param vinyl - El objeto del vinilo que se desea añadir.
   * @example
   * ```ts
   * this.cartService.addToCart(newVinyl);
   * ```
   */
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

  /** Limpia todos los elementos del carrito de compras. */
  clearCart() {
    this.cartItems.set([]);
  }

  /**
   * Elimina un producto específico del carrito basándose en su identificador.
   * @param productId - ID único del producto a eliminar.
   */
  removeItem(productId: string) {
    this.cartItems.update(items => items.filter(i => i.id !== productId));
  }

  /**
   * Actualiza la cantidad de un producto existente.
   * * @param id - ID del producto a modificar.
   * @param delta - Cantidad a sumar (positivo) o restar (negativo).
   * @remarks La cantidad mínima permitida es 1.
   */
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

  /**
   * Procesa la compra de los productos actuales.
   * * @remarks
   * Este método es asíncrono ya que coordina múltiples llamadas al `VinylService`
   * para reducir el stock en la base de datos de Supabase. Una vez completado,
   * vacía el carrito.
   * * @returns Promesa que se resuelve cuando el stock ha sido actualizado.
   */
  async checkoutProducts() {
    const itemsToBuy = this.cartItems();

    const updates = itemsToBuy.map(item =>
      this.vinilService.decreaseStock(item.id, item.quantity)
    );

    await Promise.all(updates);
    this.clearCart();
  }
}
