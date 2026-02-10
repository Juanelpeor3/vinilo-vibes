import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUp(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password
    });
  }

  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  signOut() {
    return supabase.auth.signOut();
  }

  getSession() {
    return supabase.auth.getSession();
  }

  onAuthChange(callback: any) {
    return supabase.auth.onAuthStateChange(callback);
  }
}
