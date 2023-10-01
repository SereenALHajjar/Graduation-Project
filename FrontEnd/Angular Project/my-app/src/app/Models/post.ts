export interface Post {
    // _id : number;
    user_id : number;
    title:string;
    description:string;
    type:string[];
    max_date : Date;
    pub_date: Date;
}
