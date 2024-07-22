export class CommanActionNonLog{
    email:string;
    otp: string;
    actionType:string;
    message:string;
    orderId:number;  
    actionId:number; 
    quantity:number; 
    
    
    constructor(
        email:string,
        otp:string,
        actionType:string,
        message:string,
        orderId:number,      
        actionId:number,
        quantity:number,
    ){
        this.email = email;
        this.otp = otp;
        this.actionType = actionType;
        this.message =message;
        this.orderId = orderId;
        this.actionId = actionId;
        this.quantity = quantity;
    }

}