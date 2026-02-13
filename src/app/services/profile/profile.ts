import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  async getSession() {
    return await supabase.auth.getSession();
  }

  async getProfile() {
    return await supabase
      .from("profiles")
      .select("id, name, email, role")
      .single();
  }

  async signOut() {
    await supabase.auth.signOut();
  }
}
