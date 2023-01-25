import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;

  constructor(){

  }
  
  


}
