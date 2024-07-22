export class CommanDropDown{
    id:number;
    code: string;
    name:string;
    description:string;  
    constructor(
        id:number,
        code:string,
        name:string,
        description:string
    ){
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
    }

}