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

  constructor(){
    this.posts = [
      new Post('pippo', 'ciao a tutti'),
      new Post('giacomo', 'ciao'),
      new Post('mario', 'io sono rossi')
    ]
  }








  submit_add_post(autore: HTMLInputElement, testo: HTMLTextAreaElement) {

    // console.log(autore.value)
    
  }
}
