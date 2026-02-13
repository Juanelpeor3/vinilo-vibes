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

  // Función para verificar si el usuario está autenticado
  async checkAuth() {
    const data = await supabase.auth.getSession();
    return data;
  }

  // Función para obtener el usuario actual
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }

  // Obtener el rol desde la tabla profiles
  async getUserRole(): Promise<string | null> {
    const user = await this.getUser();

    if (!user) return null; // Si no está logueado no tiene rol

    // Hacemos la consulta a la tabla profiles
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id) // El ID de auth debe coincidir con el ID del perfil
      .single();

    // Si hay un error o no se encuentra el perfil, retornamos null
    if (error || !data) {
      return null;
    }

    return data.role; // Retorna admin o user
  }
}
