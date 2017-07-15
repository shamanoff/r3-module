import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../post';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  currentUserId;
  userPost$: Observable<Post[]>;

  constructor(private _ps: PostsService, private _authServ: AuthService) {
  }

  ngOnInit() {
    this.currentUserId = this._authServ.currentUserId;
    this.userPost$ = this._ps.getPosts();
  }

  onDelete(key){
    this._ps.deletePost(key)
  }

}
