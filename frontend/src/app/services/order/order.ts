import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface OrderSummary {
  id: number;
  total: number;
  createdAt: string;
  status: string;
  itemCount: number;
}

export interface OrderDetail {
  id: number;
  total: number;
  createdAt: string;
  status: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  vinylId: number;
  vinylTitle: string;
  vinylArtist: string;
  quantity: number;
  unitPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orders`;

  async getOrders(): Promise<OrderSummary[]> {
    try {
      return await firstValueFrom(this.http.get<OrderSummary[]>(this.apiUrl));
    } catch {
      return [];
    }
  }

  async getOrderById(id: number): Promise<OrderDetail | null> {
    try {
      return await firstValueFrom(this.http.get<OrderDetail>(`${this.apiUrl}/${id}`));
    } catch {
      return null;
    }
  }
}