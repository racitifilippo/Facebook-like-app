export class Post{

    id: string
    autore: string
    testo: string
    like: number
    commenti: Comment[]


    constructor(autore: string, testo: string, like: number, testoCommento: string[], id: string) {
        this.id = id
        this.autore = autore
        this.testo = testo
        this.like = like
        this.commenti = []
        for (let t of testoCommento){
            this.commenti.push(new Comment(t))
        }
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