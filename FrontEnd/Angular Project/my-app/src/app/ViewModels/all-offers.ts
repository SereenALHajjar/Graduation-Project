import {Notification} from './notification'
export interface AllOffers {
    title:string,
    description:string,
    type:string[],
    pub_date:Date,
    numberOfOrders:number,
    offers:Notification []
}
