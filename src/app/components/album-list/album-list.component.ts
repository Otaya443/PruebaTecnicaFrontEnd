import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalAlbums: number = 0;
  limit: number = 5;
  pagesToShow: number[] = [];
  albums: Album[] = [
  ];
  

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    // Suscripción al BehaviorSubject para recibir cambios en la lista de álbumes
    this.albumService.albums$.subscribe((albums) => {
      this.albums = albums;
      this.calculateTotalPages(); // Recalcular las páginas si es necesario
    });

    // Si necesitas cargar los álbumes al inicio, también puedes hacerlo aquí
    // Aunque en este caso no es necesario ya que los datos son locales
    this.albumService.getAlbumList().subscribe((albums) => {
      this.albums = albums;
      this.calculateTotalPages();
    });
  }



  // Cargar los álbumes desde el servicio
  loadAlbums(): void {
    this.albumService.getAlbumList().subscribe((data) => {
      this.albums = data;
      this.calculateTotalPages();
    });
  }

  // Agregar un álbum a la lista
  addAlbum(newAlbum: Album): void {
    this.albumService.createAlbum(newAlbum).subscribe((album) => {
      this.albums.push(album);
      this.calculateTotalPages();
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.albums.length / this.itemsPerPage);
  }

  getPaginatedAlbums(): Album[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.albums.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



  
  

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}
