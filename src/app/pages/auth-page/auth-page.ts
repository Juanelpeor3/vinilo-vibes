import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-page',
  imports: [RouterOutlet],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.navigate(["/auth/register"])
  }

}
