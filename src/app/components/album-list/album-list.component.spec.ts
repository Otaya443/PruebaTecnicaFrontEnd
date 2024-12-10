import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumListComponent } from './album-list.component';
import { AlbumService } from 'src/app/service/album.service';
import { of } from 'rxjs';



import { Album } from 'src/app/album';

describe('Album', () => {
  it('should create an album instance', () => {
    const album = new Album(
      1,                          // id
      'Album Name',                // name
      'cover.jpg',                 // cover
      new Date('2023-01-01'),      // releaseDate
      'Description of album',      // description
      'Rock',                      // genre
      'Record Label',              // recordLabel
      []                           // comments (vacío en este caso)
    );

    expect(album).toBeTruthy();
  });
});

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let mockAlbumService: jasmine.SpyObj<AlbumService>;

  beforeEach(() => {
    // Creamos un mock del servicio
    mockAlbumService = jasmine.createSpyObj('AlbumService', ['getAlbumList', 'createAlbum']);
    
    // Configuración básica del TestBed
    TestBed.configureTestingModule({
      declarations: [AlbumListComponent],
      providers: [{ provide: AlbumService, useValue: mockAlbumService }]
    });

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load albums on init', () => {
    const mockAlbums: Album[] = [
      { id: 1, name: 'Album 1', cover: 'cover1.jpg', releaseDate: new Date('2023-01-01'), description: 'Description 1', genre: 'Rock', recordLabel: 'Label 1', comments: [] },
      { id: 2, name: 'Album 2', cover: 'cover2.jpg', releaseDate: new Date('2023-02-01'), description: 'Description 2', genre: 'Pop', recordLabel: 'Label 2', comments: [] },
    ];
    
    // Mock de la respuesta del servicio
    mockAlbumService.getAlbumList.and.returnValue(of(mockAlbums));

    // Llamada al ngOnInit
    component.ngOnInit();

    // Verificaciones
    expect(mockAlbumService.getAlbumList).toHaveBeenCalled();
    expect(component.albums).toEqual(mockAlbums);
    expect(component.totalPages).toBe(1); // De acuerdo a la cantidad de álbumes
  });

});
