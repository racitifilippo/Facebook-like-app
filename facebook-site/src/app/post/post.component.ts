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
  error_appear:boolean

  constructor(){
    this.comment_appear = false
    this.error_appear = false
  }


  add_like(){
    this.post.add_like()
  }

  comment_section_appear(){

    //per "resettare" la scritta errore quando nascondo e faccio riapparire la sezione dei commenti
    this.error_appear = false

    if (this.comment_appear){
      this.comment_appear = false
    }else{
      this.comment_appear = true
    }
  }

  add_comment(commento: HTMLTextAreaElement){
    if (commento.value == ''){
      this.error_appear = true
    }else{
      this.error_appear = false
      this.post.add_comment(commento.value)
      commento.value = ''
    }
    }

  }
  
  



