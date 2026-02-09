import { Component } from '@angular/core';
import { NavBar } from "../../shared/components/nav-bar/nav-bar";
import { Footer } from "../../shared/components/footer/footer";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [NavBar, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
