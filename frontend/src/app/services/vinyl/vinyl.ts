import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Vinyl } from '../../shared/models/vinyl-model';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio encargado de gestionar el catálogo de vinilos.
 * @remarks
 * Realiza operaciones sobre la API REST del backend para el CRUD
 * de vinilos e integra la búsqueda por título/artista.
 */
@Injectable({
  providedIn: 'root',
})
export class VinylService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/vinyls`;

  /**
   * Obtiene la lista completa de vinilos.
   * @returns Promesa con un array de objetos Vinyl.
   * Si ocurre un error, retorna un array vacío.
   */
  async getAll(): Promise<Vinyl[]> {
    try {
      return await firstValueFrom(this.http.get<Vinyl[]>(this.apiUrl));
    } catch {
      return [];
    }
  }

  /**
   * Busca un vinilo específico por su identificador.
   * @param id - Identificador único del vinilo.
   * @returns Promesa con el objeto Vinyl o `null` si no se encuentra o hay un error.
   */
  async getById(id: string): Promise<Vinyl | null> {
    try {
      return await firstValueFrom(this.http.get<Vinyl>(`${this.apiUrl}/${id}`));
    } catch {
      return null;
    }
  }

  /**
   * Filtra el catálogo de vinilos por un género específico.
   * @param genreId - ID del género musical.
   * @returns Lista de vinilos que pertenecen al género indicado.
   */
  async getByGenreId(genreId: string): Promise<Vinyl[]> {
    try {
      return await firstValueFrom(this.http.get<Vinyl[]>(`${this.apiUrl}/genre/${genreId}`));
    } catch {
      return [];
    }
  }

  /**
   * Busca vinilos cuyo título o artista contengan el texto indicado.
   * @param query - Texto a buscar (insensible a mayúsculas).
   * @returns Lista de vinilos que coinciden con la búsqueda.
   */
  async search(query: string): Promise<Vinyl[]> {
    const all = await this.getAll();
    const q = query.toLowerCase();
    return all.filter(v =>
      v.title.toLowerCase().includes(q) || v.artist.toLowerCase().includes(q)
    );
  }

  /**
   * Crea un nuevo registro de vinilo en la base de datos.
   * @param vinyl - Objeto con la información del vinilo (sin el ID).
   * @returns El objeto Vinyl creado o `null` en caso de fallo.
   */
  async create(vinyl: Omit<Vinyl, 'id'>): Promise<Vinyl | null> {
    try {
      return await firstValueFrom(this.http.post<Vinyl>(this.apiUrl, vinyl));
    } catch {
      return null;
    }
  }

  /**
   * Elimina un vinilo de la base de datos.
   * @param id - Identificador numérico del vinilo.
   * @returns `true` si la operación fue exitosa, `false` en caso contrario.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Actualiza la información de un vinilo existente.
   * @param id - Identificador del registro a modificar.
   * @param vinyl - Datos actualizados del vinilo.
   * @returns Booleano indicando el éxito de la operación.
   */
  async update(id: number, vinyl: Omit<Vinyl, 'id'>): Promise<boolean> {
    try {
      await firstValueFrom(this.http.put(`${this.apiUrl}/${id}`, vinyl));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reduce el stock disponible de un vinilo tras una compra.
   * @param id - ID del vinilo.
   * @param quantity - Cantidad de unidades a descontar.
   * @returns `true` si el stock se actualizó correctamente.
   */
  async decreaseStock(id: number, quantity: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.patch(`${this.apiUrl}/${id}/stock`, quantity));
      return true;
    } catch {
      return false;
    }
  }
}