import { Component, OnInit } from '@angular/core';
import { Post } from './post/post.model';
import { HttpClient }  from'@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'facebook-site';
  posts: Post[]

  error_appear: boolean

  post_height: number;


  constructor(private httpClient : HttpClient){
    this.posts = []

    this.error_appear = false
    this.post_height = 470


  }

  ngOnInit(): void {
    this.refresh_post_from_db()
  }
  

  refresh_post_from_db(){
    this.httpClient
    .get<any>(
      'http://93.48.224.122:8080/index'
      )
    .subscribe( 
      httpResponse => { 
        // console.log(httpResponse); 
        this.posts = []
        
        // Add post to posts's array
        for (let p of httpResponse){
          let comm: string[] = []
          for (let c of p["commenti"]){
            comm.push(c["testoCommento"])
          }
          this.posts.push(new Post(p["autorePost"], p["testoPost"], p["like"], comm, p["id"]))
        }
      }
      )
  }

  sorted_posts(): Post[]{
    return this.posts.sort((a: Post, b: Post) => (b.like - a.like))
  }

  add_post_to_db(post: Post){
    this.httpClient
    .post<any>(
      'http://93.48.224.122:8080/add_post',
      { 
        autorePost: post.autore,
        testoPost: post.testo,
        like: 0,
        commenti: []
      },
      {
        'headers':{'Content-Type': 'application/json'}
      }
      )
    .subscribe(
      data => {
        console.log(data)
        this.refresh_post_from_db()
      }
    )
  }


  submit_add_post(autore: HTMLInputElement, testo: HTMLTextAreaElement) {
    if (autore.value != '' && testo.value != ''){
      this.post_height = 470
      this.error_appear = false

      let post_to_add = new Post(autore.value, testo.value, 0, [], '')
      autore.value = ''
      testo.value = ''

      this.add_post_to_db(post_to_add)

    }else{
      this.error_appear = true
      this.post_height = 510

    }
    
  }
}
