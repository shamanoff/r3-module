import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostsService} from '../posts/posts.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit, AfterViewInit {
  postForm: FormGroup;
  currentUserName: string;
  currenUserId: string;
  lengthErrorMessage = '';
  private validationMessages = {
    required: 'Это поле обязательно.',
    minlength: 'Введите больше символов.',
    maxlength: 'Слишком много символов.',

  };

  constructor(private _ps: PostsService,
              private _fb: FormBuilder,
              private _authServ: AuthService,
              private _db: AngularFireDatabase,
  ) {
  }

  ngOnInit() {

    this.currenUserId = this._authServ.currentUserId;
    // this.currentUserName = this._authServ.getUserName();
    this.postForm = this._fb.group({
      title: ['', [Validators.maxLength(100)]],
      text: ['', [Validators.maxLength(600)]],
      url: ['', [Validators.maxLength(600)]],
      pic: ['', [Validators.maxLength(600)]],


    });

    const titleControl = this.postForm.get('title');
    titleControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(titleControl)
      );
    const textControl = this.postForm.get('text');
    textControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(textControl)
      );
    const urlControl = this.postForm.get('url');
    urlControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(urlControl)
      );
    const picControl = this.postForm.get('pic');
    picControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(picControl)
      );
    // this.populateData();
  }

  setMaxMsg(c: AbstractControl): void {
    this.lengthErrorMessage = '';
    if (c.errors) {
      this.lengthErrorMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  ngAfterViewInit(): void {
    this.getUser();

  }
  onSubmit(formData): void {

    const created_at = new Date().toString();


    const data = {
      author: this.currentUserName,
      authorId: this._authServ.currentUserId,
      date: created_at,
      title: formData.value.title,
      text: formData.value.text,
      url: formData.value.url,
      pic: formData.value.pic,
    };
    if (formData.valid) {
      console.log('valid');
      console.log(this.postForm.getRawValue());
      console.log(this.currentUserName + ' UserName');
      console.log(this.currenUserId + ' id');
      this._ps.addPost(data)
        .catch(error => console.log(error));

    } else console.log('not valid' + formData.valid);
    formData.reset();
  }

  getUser() {
    this._db.object('/users/' + this.currenUserId).subscribe(
      user => this.currentUserName = user.userName
    );
  }
}
