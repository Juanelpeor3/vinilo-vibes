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
      .select('*');

    if (error) {
      return [];
    }
    return data as Vinyl[];
  }
  async getById(id: string): Promise<Vinyl | null> {
    const { data, error } = await supabase
      .from("vinyls")
      .select('*')
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
      .select('*')
      .eq("genre_id", genreId); // Filtramos por la columna 'genre_id'

    if (error) {
      return []; // Retornamos un array vacío si falla
    }

    return data as Vinyl[];
  }
}
