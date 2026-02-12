import { Component } from '@angular/core';
import { Hero } from "../../shared/components/hero/hero";
import { VinylList } from "../vinyl-list/vinyl-list";

@Component({
  selector: 'app-home',
  imports: [Hero, VinylList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
