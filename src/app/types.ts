export type ProductType = {
    name:string,
    brand:string,
    price:number,
    rating:number,
    description:string,
    _id:string,
    quantity:number,
    image:string,
}

export type UserType = {
    username:String,
    email:String,
    id:String,
    isAdmin:boolean,
    cart:ProductType[],
}