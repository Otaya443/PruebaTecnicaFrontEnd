import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../album';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumsSubject = new BehaviorSubject<Album[]>([]); // Estado reactivo de los álbumes
  albums$: Observable<Album[]> = this.albumsSubject.asObservable();


  private albums: Album[] = [

  ];

  private api: string = 'https://backvynils-q6yc.onrender.com/albums'
  constructor(private http: HttpClient) { }

  getAlbums(page: number, limit: number): Observable<{ albums: Album[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ albums: Album[], total: number }>(this.api, { params });
  }

  getAlbumList(): Observable<Album[]> {
    return this.http.get<Album[]>(this.api);
  }
  // getAlbumList(): Observable<Album[]> {
  //   return of(this.albums);
  // }


  // createAlbum(album: Album): Observable<Album> {
  //   const newId = this.albums.length > 0 ? Math.max(...this.albums.map(a => a.id)) + 1 : 1;
  //   const newAlbum = { ...album, id: newId }; // Crear un nuevo objeto con el ID generado
  //   this.albums.push(newAlbum); // Agregarlo al array local

  //   // Emitir el nuevo álbum para que cualquier componente que esté suscrito reciba los datos actualizados
  //   this.albumsSubject.next(this.albums); // Actualizar el BehaviorSubject con la nueva lista

  //   return of(newAlbum); // Retornar el nuevo álbum como un Observable
  // }
  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.api, album);
  }

  createCommment(comment: Comment, id: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.api}/${id}/comments`, comment);
  }

getAlbumById(id: number): Observable < Album > {
  return this.http.get<Album>(`${this.api}/${id
    }`);
}

  // getAlbumById(id: number): Observable<Album | null> {
  //   const album = this.albums.find((a) => a.id === id) || null;
  //   return of(album);
  // }

}
