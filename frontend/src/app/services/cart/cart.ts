import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface CartItem {
  id: number;
  vinylId: number;
  vinylTitle: string;
  vinylArtist: string;
  vinylImageUrl?: string;
  vinylPrice: number;
  quantity: number;
}

interface OrderResponse {
  id: number;
  total: number;
  createdAt: string;
  status: string;
  items: any[];
}

/**
 * Servicio encargado de gestionar el carrito de compras de Vinilo Vibes.
 * @remarks
 * Este servicio utiliza **Signals** de Angular para un manejo de estado reactivo y eficiente.
 * Los datos se sincronizan con la API REST del backend.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cart`;

  /** Lista reactiva de productos en el carrito. */
  cartItems = signal<CartItem[]>([]);

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
    const total = this.cartItems().reduce((acc, item) => acc + (item.vinylPrice * item.quantity), 0);
    return Math.round(total * 100) / 100;
  });

  /**
   * Carga los items del carrito desde la API.
   */
  async loadCart() {
    try {
      const items = await firstValueFrom(this.http.get<CartItem[]>(this.apiUrl));
      this.cartItems.set(items);
    } catch {
      this.cartItems.set([]);
    }
  }

  /**
   * Añade un vinilo al carrito o incrementa su cantidad si ya existe.
   * @param vinyl - El objeto del vinilo que se desea añadir.
   */
  async addToCart(vinyl: any) {
    try {
      await firstValueFrom(
        this.http.post(this.apiUrl, { vinylId: vinyl.id, quantity: 1 })
      );
      await this.loadCart();
    } catch {
      // fallback silencioso
    }
  }

  /** Limpia todos los elementos del carrito de compras. */
  async clearCart() {
    try {
      await firstValueFrom(this.http.delete(this.apiUrl));
      this.cartItems.set([]);
    } catch {
      this.cartItems.set([]);
    }
  }

  /**
   * Elimina un producto específico del carrito basándose en su identificador.
   * @param vinylId - ID del vinilo a eliminar.
   */
  async removeItem(vinylId: number) {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${vinylId}`));
      await this.loadCart();
    } catch {
      // fallback silencioso
    }
  }

  /**
   * Actualiza la cantidad de un producto existente.
   * @param vinylId - ID del vinilo a modificar.
   * @param quantity - Nueva cantidad deseada.
   */
  async updateQuantity(vinylId: number, quantity: number) {
    try {
      await firstValueFrom(
        this.http.put(`${this.apiUrl}/${vinylId}`, { quantity })
      );
      await this.loadCart();
    } catch {
      // fallback silencioso
    }
  }

  /**
   * Procesa la compra de los productos actuales.
   * @remarks
   * Envía la orden al backend, que valida stock, crea la orden,
   * descuenta stock y vacía el carrito.
   * @returns La orden creada o `null` en caso de fallo.
   */
  async checkoutProducts(): Promise<OrderResponse | null> {
    try {
      const order = await firstValueFrom(
        this.http.post<OrderResponse>(`${environment.apiUrl}/orders/checkout`, {})
      );
      this.cartItems.set([]);
      return order;
    } catch {
      return null;
    }
  }
}