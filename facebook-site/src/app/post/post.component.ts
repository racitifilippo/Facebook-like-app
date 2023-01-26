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
  comment_appear:boolean

  constructor(){
    this.comment_appear = false
  }


  add_like(){
    this.post.add_like()
  }

  comment_section_appear(){
    if (this.comment_appear){
      this.comment_appear = false
    }else{
      this.comment_appear = true
    }
  }
  
  


}
