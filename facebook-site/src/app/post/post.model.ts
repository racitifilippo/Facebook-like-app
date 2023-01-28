export class Post{

    autore: string
    testo: string
    like: number
    commenti: Comment[]

    constructor(autore: string, testo: string) {
        this.autore = autore
        this.testo = testo
        this.like = 0
        this.commenti = []
    }

    add_like(): number{
        this.like ++
        return this.like
    }

    add_comment(testo: string){
        this.commenti.push(new Comment(testo))
    }
    
}

class Comment{
    testo: string


    constructor(testo: string){
        this.testo = testo

    }
}