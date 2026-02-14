import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-stock-data',
  imports: [],
  templateUrl: './stock-data.html',
  styleUrl: './stock-data.scss',
})
export class StockData {
  data = input<{ stock: number }>({ stock: 0 });
}
