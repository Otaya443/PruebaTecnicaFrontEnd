import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumAddComponent } from './components/album-add/album-add.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { CommentsAddComponent } from './components/comments-add/comments-add.component';


const routes : Routes = [
  {path:'', component: AlbumListComponent},
  {path:'albums/add', component: AlbumAddComponent},
  { path: 'albums/:id', component: AlbumDetailComponent },
  { path: 'comments/add/:id', component: CommentsAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumAddComponent,
    AlbumListComponent,
    AlbumDetailComponent,
    CommentsAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
