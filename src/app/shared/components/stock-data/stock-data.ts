import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-data',
  imports: [],
  templateUrl: './stock-data.html',
  styleUrl: './stock-data.scss',
})
export class StockData {
  @Input() data: { stock: number } = { stock: 0 }; // Recibimos el stock del vinilo
}
