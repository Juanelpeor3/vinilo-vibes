import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { supabase } from './supabase';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vinilo-vibes');
  constructor(private router: Router) { }
  ngOnInit() {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Sesión:", session);
    });
  }
}
