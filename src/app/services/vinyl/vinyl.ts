import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';
import { Vinyl } from '../../shared/models/vinyl-model';

/**
 * Servicio encargado de gestionar el catálogo de vinilos.
 * @remarks
 * Realiza operaciones sobre la tabla `vinyls` de Supabase e integra
 * la recuperación de reseñas asociadas desde la tabla `ratings`.
 */
@Injectable({
  providedIn: 'root',
})
export class VinylService {

  /**
   * Obtiene la lista completa de vinilos.
   * @returns Promesa con un array de objetos Vinyl. Incluye sus ratings asociados.
   * Si ocurre un error, retorna un array vacío.
   */
  async getAll(): Promise<Vinyl[]> {
    const { data, error } = await supabase
      .from("vinyls")
      .select("*, ratings(*)") // Seleccionamos todos los campos de vinyls y también los ratings relacionados
      .order("id", { ascending: true });
    if (error) {
      return [];
    }
    return data as Vinyl[];
  }

  /**
   * Busca un vinilo específico por su identificador.
   * @param id - UUID o identificador único del vinilo.
   * @returns Promesa con el objeto Vinyl o `null` si no se encuentra o hay un error.
   */
  async getById(id: string): Promise<Vinyl | null> {
    const { data, error } = await supabase
      .from("vinyls")
      .select("*, ratings(*)") // Seleccionamos todos los campos de vinyls y también los ratings relacionados
      .eq("id", id) // Filtramos por el ID
      .single();    // Un solo objeto

    if (error) {
      return null;
    }

    return data as Vinyl;
  }
  /**
   * Filtra el catálogo de vinilos por un género específico.
   * @param genreId - ID del género musical.
   * @returns Lista de vinilos que pertenecen al género indicado.
   */
  async getByGenreId(genreId: string): Promise<Vinyl[]> {
    const { data, error } = await supabase
      .from("vinyls")
      .select("*, ratings(*)") // Seleccionamos todos los campos de vinyls y también los ratings relacionados
      .eq("genre_id", genreId) // Filtramos por la columna 'genre_id'
      .order("id", { ascending: true });
    if (error) {
      return []; // Retornamos un array vacío si falla
    }

    return data as Vinyl[];
  }

  /**
   * Crea un nuevo registro de vinilo en la base de datos.
   * @remarks El método asegura que los valores de precio, stock y género se inserten como tipos numéricos.
   * @param vinyl - Objeto con la información del vinilo (sin el ID).
   * @returns El objeto Vinyl creado o `null` en caso de fallo.
   */
  async create(vinyl: Omit<Vinyl, 'id'>): Promise<Vinyl | null> {
    // Convertimos los campos numéricos a números antes de insertarlos
    const payload = {
      ...vinyl,
      price: Number(vinyl.price),
      stock: Number(vinyl.stock),
      genre_id: Number(vinyl.genre_id)
    };
    const { data, error } = await supabase
      .from("vinyls")
      .insert(payload)
      .select()
      .single();
    if (error) {
      return null;
    }
    return data as Vinyl;
  }

  /**
   * Elimina un vinilo de la base de datos.
   * @param id - Identificador numérico del vinilo.
   * @returns `true` si la operación fue exitosa, `false` en caso contrario.
   */
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from("vinyls")
      .delete()
      .eq("id", id);
    return !error;
  }

  /**
   * Actualiza la información de un vinilo existente.
   * @param id - Identificador del registro a modificar.
   * @param vinyl - Datos actualizados del vinilo.
   * @returns Booleano indicando el éxito de la operación.
   */
  async update(id: number, vinyl: Omit<Vinyl, 'id'>): Promise<boolean> {
    const payload = {
      ...vinyl,
      price: Number(vinyl.price),
      stock: Number(vinyl.stock),
      genre_id: Number(vinyl.genre_id)
    };
    const { error } = await supabase
      .from("vinyls")
      .update(payload)
      .eq("id", id);
    return !error;
  }

  /**
   * Reduce el stock disponible de un vinilo tras una compra.
   * @remarks
   * Primero obtiene el stock actual y luego calcula el nuevo valor.
   * Si el resultado es negativo, el stock se fija en 0 por seguridad.
   * @param id - ID del vinilo.
   * @param quantity - Cantidad de unidades a descontar.
   * @returns `true` si el stock se actualizó correctamente.
   */
  async decreaseStock(id: number, quantity: number): Promise<boolean> {
    const { data: vinyl, error: fetchError } = await supabase
      .from('vinyls')
      .select('stock')
      .eq('id', id)
      .single();

    if (fetchError || !vinyl) {
      return false;
    }

    const newStock = vinyl.stock - quantity;
    const finalStock = newStock >= 0 ? newStock : 0;

    const { error: updateError } = await supabase
      .from('vinyls')
      .update({ stock: finalStock }) // Solo actualizamos el campo stock
      .eq('id', id);

    if (updateError) {
      return false;
    }

    return true;
  }
}
