import { Component } from '@angular/core';
import { CollectionsBar } from "../collections-bar/collections-bar";

@Component({
  selector: 'app-hero',
  imports: [CollectionsBar],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
