import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';

/**
 * Servicio para la gestión del perfil del usuario y sesión actual.
 * @remarks
 * Este servicio interactúa directamente con el cliente de Supabase para obtener
 * datos de autenticación y metadatos adicionales del usuario desde la tabla `profiles`.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  /**
   * Recupera la información detallada del perfil del usuario autenticado.
   * @remarks
   * Realiza una consulta a la tabla `profiles` de Supabase seleccionando los campos:
   * `id`, `name`, `email` y `role`.
   * @returns Una promesa con los datos del perfil del usuario. 
   * Se espera un único registro mediante el método `.single()`.
   */
  async getProfile() {
    return await supabase
      .from("profiles")
      .select("id, name, email, role")
      .single();
  }

  /**
   * Finaliza la sesión del usuario actual en el dispositivo.
   * @remarks
   * Utiliza el método `signOut` de la librería de autenticación de Supabase
   * para invalidar la sesión local.
   * @returns Una promesa que se resuelve al completar el proceso de cierre de sesión.
   */
  async signOut() {
    await supabase.auth.signOut();
  }
}
