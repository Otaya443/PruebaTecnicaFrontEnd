import { Comment } from './comment'; 


export class Album {
    constructor(public id : number, 
        public name: String,
        public cover: String,
        public releaseDate: Date,
        public description: String,
        public genre: String,
        public recordLabel: String,
        public comments: Comment[]
    ){
    }
}

