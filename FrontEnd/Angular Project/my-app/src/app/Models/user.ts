export interface User {
    
    _id:number;
    fname:string;
    lname:string;
    phone:string;
    password:string;
    confirmpassword:string;
    [key: string]: any;
    gender:string;
    city:string;
    photo:File |string;
    birth_date:Date;
    Skill:string[];
    ProjectLink:string[];
  

}
/*  
phone:string[];
  birth_date:{
        day:string;
        month:string;
        year:string;
    }
skill:{
     id:number;
    user_id:number;
    skill:string;
}
 ProjectLink:{
      id:number;
        user_id:number;
        link:string;
}






*/
