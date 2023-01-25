export class Post{

    autore: string
    testo: string
    like: number

    constructor(autore: string, testo: string) {
        this.autore = autore
        this.testo = testo
        this.like = 0
    }

    add_like(): number{
        this.like ++
        return this.like
    }
    
}