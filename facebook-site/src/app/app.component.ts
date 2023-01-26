import { Component } from '@angular/core';
import { Post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facebook-site';
  posts: Post[]

  error_appear: boolean

  post_height: number;

  constructor(){
    this.posts = []
    this.posts = [
      new Post('pippo', 'ciao a tutti'),
      new Post('giacomo', 'ciao'),
      new Post('mario', 'io sono rossi')
    ]

    this.error_appear = false
    this.post_height = 470
  }



  sorted_posts(): Post[]{
    return this.posts.sort((a: Post, b: Post) => (b.like - a.like))
  }




  submit_add_post(autore: HTMLInputElement, testo: HTMLTextAreaElement) {
    if (autore.value != '' && testo.value != ''){
      this.post_height = 470
      this.error_appear = false


      this.posts.push(new Post(autore.value, testo.value))
      autore.value = ''
      testo.value = ''
    }else{
      this.error_appear = true
      this.post_height = 510

    }
    
  }
}
