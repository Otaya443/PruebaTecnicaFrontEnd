import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css']
})
export class AlbumAddComponent {
  albumForm: FormGroup;
  genres: string[] = ['Classical', 'Salsa', 'Rock', 'Folk'];
  recordLabel: string[] = ['Sony Music', 'Discos Fuentes', 'Elektra', 'Fania Records'];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private albumService: AlbumService, private router: Router) {
    this.albumForm = this.fb.group({
      name: ['', Validators.required],
      cover: ['', [Validators.required, Validators.pattern('https?://.+')]],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      recordLabel: ['', Validators.required]
    });
  }




  onSubmit(): void {
    if (this.albumForm.valid) {
      const newAlbum = this.albumForm.value;
      console.log('Datos enviados:', newAlbum);

      this.albumService.createAlbum(newAlbum).subscribe(
        (album) => {
          console.log('Álbum creado:', album);
          alert('Álbum creado exitosamente');
          this.albumForm.reset();
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error al crear álbum:', error);
          alert('Hubo un error al crear el álbum');
        });
    }
  }
}




