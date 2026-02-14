import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';
import { Vinyl } from '../../shared/models/vinyl-model';

@Injectable({
  providedIn: 'root',
})
export class VinylService {
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

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from("vinyls")
      .delete()
      .eq("id", id);
    return !error;
  }
  async update(id: number, vinyl: Omit<Vinyl, 'id'>): Promise<boolean> {
    // Convertimos los campos numéricos a números antes de actualizarlos
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
}
