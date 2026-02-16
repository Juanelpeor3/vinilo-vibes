import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';

/**
 * Servicio de autenticación de la aplicación.
 *
 * @remarks
 * Encapsula todas las operaciones relacionadas con autenticación
 * usando Supabase como proveedor.
 *
 * Este servicio maneja:
 * - Registro de usuarios
 * - Inicio y cierre de sesión
 * - Obtención de sesión actual
 * - Escucha de cambios de autenticación
 * - Obtención del rol del usuario desde la tabla `profiles`
 *
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Registra un nuevo usuario con email y contraseña.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Promesa con la respuesta de Supabase.
   *
   */
  signUp(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password
    });
  }

  /**
   * Inicia sesión con email y contraseña.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Promesa con el resultado de autenticación.
   * 
   */
  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  /**
   * Cierra la sesión actual del usuario.
   *
   * @returns Promesa que indica el resultado del cierre de sesión.
   */
  signOut() {
    return supabase.auth.signOut();
  }

  /**
   * Obtiene la sesión actual almacenada.
   *
   * @returns Promesa con la sesión activa o `null` si no existe.
   */

  getSession() {
    return supabase.auth.getSession();
  }

  /**
   * Escucha cambios en el estado de autenticación.
   *
   * @param callback - Función que se ejecuta cuando cambia el estado de auth.
   * @returns Suscripción al listener de Supabase.
   */
  onAuthChange(callback: any) {
    return supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Verifica si existe una sesión activa.
   *
   * @returns Promesa con la información de sesión actual.
   */
  async checkAuth() {
    const data = await supabase.auth.getSession();
    return data;
  }

  /**
   * Obtiene el usuario autenticado actualmente.
   *
   * @returns El objeto usuario o `null` si no hay sesión activa.
   */
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }

  /**
   * Obtiene el rol del usuario desde la tabla `profiles`.
   *
   * @remarks
   * El ID del usuario autenticado debe coincidir con el ID
   * almacenado en la tabla `profiles`.
   *
   * @returns El rol del usuario (`admin`, `user`.)
   * o `null` si no está autenticado o no existe perfil.
   */
  async getUserRole(): Promise<string | null> {
    const user = await this.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      return null;
    }

    return data.role;
  }
}
