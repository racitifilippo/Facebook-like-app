import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Post } from './post.model';
import { HttpClient }  from'@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  comment_appear:boolean
  error_appear:boolean

  constructor(private httpClient : HttpClient){
    this.comment_appear = false
    this.error_appear = false
  }

  add_like_to_db(){
    this.httpClient
    .post<any>(
      'http://93.48.224.122:8080/add_like',
      // passo tutto perche devo capire a quale post cambiare il numero dei like
      { 
        id: this.post.id,
        like: this.post.like
      },
      {
        'headers':{'Content-Type': 'application/json'}
      }
      )
    .subscribe(
      data => {
        console.log(data)

      }
    )
  }

  add_comment_to_db(commento: string){
    this.httpClient
    .post<any>(
      'http://93.48.224.122:8080/add_comment',
      // passo tutto perche devo capire a quale post cambiare il numero dei like
      { 
        id: this.post.id,
        comment: commento
      },
      {
        'headers':{'Content-Type': 'application/json'}
      }
      )
    .subscribe(
      data => {
        console.log(data)
        this.post.add_comment(commento)
      }
    )
  }


  add_like(){
    this.post.add_like()
    this.add_like_to_db()
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
      this.add_comment_to_db(commento.value)
      commento.value = ''
    }
    }

  }
  
  



