import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/service/album.service';
import { Album } from 'src/app/album';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  localAlbumId: number = 1;


  album: Album | undefined;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.getAlbumById(id).subscribe((data) => {
      if (data) {
        this.album = data;
        console.log(this.album.comments[1])
      } else {
        console.error('Álbum no encontrado.');
      }
    });

   
  }


  getAlbumDetails(id: number): void {
    this.albumService.getAlbumById(id).subscribe(
      (data) => {
        if (data) {
          this.album = data;
        } else {
          console.error('Album no encontrado.');
        }
      },
      (error) => {
        console.error('Error fetching album:', error);
      }
    );
  }
}
