import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';
import { Vinyl } from '../../shared/components/vinyl-card/vinyl-card';

@Injectable({
  providedIn: 'root',
})
export class VinylService {
  async getAll(): Promise<Vinyl[]> {
    const { data, error } = await supabase
      .from("vinyls")
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    return data as Vinyl[];
  }
}
