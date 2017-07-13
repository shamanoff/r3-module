
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsComponent} from './posts/posts.component';
import {AddPostComponent} from './add-post/add-post.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsComponent,
    AddPostComponent,
  ],
  exports: [
    CommonModule,
    PostsComponent,
    AddPostComponent
  ]
})
export class PostModule {}
