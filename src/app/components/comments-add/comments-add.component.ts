import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-comments-add',
  templateUrl: './comments-add.component.html',
  styleUrls: ['./comments-add.component.css']
})
export class CommentsAddComponent implements OnInit {

  commentForm: FormGroup;
  id!: number;


  constructor(private fb: FormBuilder, private router: Router,  private albumService: AlbumService, private route: ActivatedRoute,) {
    this.commentForm = this.fb.group({
      description: ['', Validators.required],
      rating: ['', [Validators.required]],
    });
  }



  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
  if (albumId) {
    this.id = Number(albumId);
  } else {
    console.error('No se encontró el ID del álbum.');
    this.router.navigate(['/']); 
  }
  }

  

  onSubmitComment(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id')); 
  const collectorId = 1; 

  if (this.commentForm.valid) {
    
    const newComment = {
      ...this.commentForm.value,
      collector: { id: collectorId }

    };

      this.albumService.createCommment(newComment, albumId).subscribe(
        (comment) => {
          console.log('Comentario creado:', comment);
          alert('Álbum creado exitosamente');
          this.commentForm.reset();
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error al crear Comentario:', error);
          alert('Hubo un error al crear el Comentario');
        });
    }
  }

}
