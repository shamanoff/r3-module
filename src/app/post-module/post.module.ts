
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './add-post/add-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ReversePipe} from '../shared/reverse.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsComponent,
    AddPostComponent,
    ReversePipe
  ],
  exports: [
    CommonModule,
    PostsComponent,
    AddPostComponent
  ]
})
export class PostModule {}
