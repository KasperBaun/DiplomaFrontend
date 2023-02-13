export default class Category{
    title : string = ""; 
    picture : string = "";  
    id : number = null; 

    constructor(
        id : number,
        title : string, 
        picture : string){
            this.id = id;
            this.title = title;
            this.picture = picture;
    }
}