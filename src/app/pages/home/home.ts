import { Component } from '@angular/core';
import { Hero } from "../../shared/components/hero/hero";

@Component({
  selector: 'app-home',
  imports: [Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
