/*
const UserController=require("./UserController")//برجعلي كلاس
const UController=new UserController();
/*UController.connect().then((db)=>{//handle sucses case
 console.log("connected");
},(err)=>{
    console.log(err);
});
var user={name:"jjj",price:"78"};
UController.insertUser(user).then((res)=>{
 console.log(res);
});*/


/*const express=require("express")
const app =express()
const db=require("./UserController")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.listen(3000,()=>{
    console.log("on port 3000...")
})*/
//const ImageModel = require("./src/User/UserModel");
//const multer=require("multer")
const express=require("express");
const app =express();
var mongoose=require("mongoose");
mongoose.set('strictQuery',true );
var routes=require("./routes/routes");
const cors=require("cors");
const Post = require('./src/models/Post');
const Offer = require('./src/models/Offer');
const User = require('./src/User/UserModel') ;
const Message = require('./src/models/Message');
const UserList = require('./src/models/UserList');
const mongog=require("mongodb") ;
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors(
 {
    origin:"http://localhost:4200"
 }

));


mongoose.connect('mongodb://127.0.0.1:27017/Talabat',{useNewUrlParser:true,useUnifiedTopology:true},function checkDB(error)
{
  
 if(error)
 {

    console.log(error)
 }
 else{
    console.log("DB Connected!!!!!!")
 }

});
app.listen(9992,function port(error)
{
 if(error)
 {
    console.log(error)
 }
 else{
    console.log("port Connected 9992")
 }

});

app.use(express.json());
app.use(routes);

//////////////////////////////////////////////////////////////////////////io 
app.post('/lastuser' , async(req , res)=>{
   var message = await UserList.find({second_id:req.body.id} , {first_id:true}).sort({date:-1}).limit(1) ;
   console.log(message[0]) ;
   message = message[0] ;
   var user = await User.find({_id:message.first_id}) ;
   res.status(200).json(user[0]);
})

app.post('/sendmessage' , async(req , res)=>{
  var m = await Message.create(req.body) ;
  console.log(m) ;
   res.status(200).json(m);
})
app.post('/messagelist' , async(req , res)=>{
   const messagelist = await Message.find({$or:[{"sender_id":req.body.id} , {"receiver_id":req.body.id}]}).sort({'date':1}) ;
   res.status(200).json(messagelist);
})
// app.post('/adduserlist' , async(req , res)=>{
//    await UserList.create(req.body) ;
//    res.status(200).json("ok");
// })
app.post('/adduserlist' , async(req , res)=>{
   await UserList.create(req.body) ;
   res.status(200).json({ok:true});
})
app.post('/users' , async(req, res) =>{
   const users = await UserList.find({first_id:req.body.id} , {second_id:true}) ;
   const users2 = await UserList.find({"second_id":req.body.id} , {"first_id":true}) ;
   final = [] ;
   for(let i=0 ; i<users.length ; i++)
   {
      var x = await User.findOne({"_id":users[i].second_id} , {"fname":true , "lname":true}) ;
      final.push(x) ;
   }
   for(let i=0 ; i<users2.length ; i++)
   {
      var x = await User.findOne({"_id":users2[i].first_id} , {"fname":true , "lname":true}) ;
      final.push(x) ;
   }
   res.status(200).json(final);
})



app.post('/getuserbypost',async(req, res) =>{
  try
  { const post = await Post.findById(req.body.post_id);
   console.log(post);
   const user = await User.findById(post.user_id);
   res.status(200).json(user);
console.log(user)}
   catch(error){
      res.status(500).json({message: error.message})
   }
})
app.post('/messagelist2' , async(req , res)=>
{
   const message = await Message.find({}).sort({date:1}) ;
   res.status(200).json(message) ;
})

/////////////////notification/////////////////////

// app.get('/notif/:id',async (req,res)=>{
//    try {

//    }
//    catch(error){

//    }
// })

//////////////////////////userOffer////////////////
app.post('/useroffer', async(req, res) =>{
   try {
      // var id=mongo.ObjectId() ;
      //  const {id} = req.params;
      // return console.log(req.body.id) ;
       const users = await Offer.find({"user_id":req.body.id});
       res.status(200).json(users);
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})
//////////////////notification////////////////

// app.get('/notif/:id',async(req,res)=>{

// })

/////////////////accept offer ///////////////////////
///////////////////get offer by id ///////////////////
app.get('/Offer/:id',async(req,res)=>{
try 
   {   const offer = await Offer.findById(req.params.id)
   console.log(offer)
   res.status(200).json(offer);}
catch(error){
   res.status(500).json({message: error.message})
}
})
///////////////////update offer /////////////
app.put('/updateoffer/:id',async(req,res)=>{
   try{
         const offerbefore = await Offer.findById(req.params.id);
         console.log(offerbefore);
         const offerafter = req.body;
         offerbefore.a
   }
   catch (error){
      res.status(500).json({message: error.message})
   }
})
app.post('/getuserInfo', async(req, res) =>{
   try {
      // var id=mongo.ObjectId() ;
      //  const {id} = req.params;
      // return console.log(req.body.id) ;
       const users1 = await User.find({"_id":req.body.id});
       res.status(200).json(users1);
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})

app.post('/addpost',async (req,res)=>
{
   try{
         const post = await Post.create(req.body);
         res.status(200).json(post)
   }
   catch (error){
      console.log(error.message);
      res.status(500).json({message: error.message})
   }
})
///////////////////////////////////
app.post('/getnotif' , async(req , res)=>{
 try { var post = await Post.find({user_id:req.body.id}).limit(1);
   post=post[0] ;
   // console.log(post._id);
   var offers = await Offer.find({post_id:post._id} ,
       {_id:true , user_id:true , pub_date:true , money:true , max_date:true})  ;
   console.log(offers);
   final=[] ;
   for(let i=0 ; i<offers.length ; i++)
   {
      var offer=offers[i] ;
      var user=await User.findOne({_id:offers[i].user_id}) ;
      var name=user.fname+' '+user.lname ; 
      var acc = await Offer.find({"user_id":user._id , accepted:1}).count() ;
      var all = await Offer.find({"user_id":user._id}).count() ;
      var ans = acc/all ; 
      obj={offer_id:offer._id ,user_id:user._id , userName:name , userPhoto:user.photo , rate:ans , pub_date:offer.pub_date , title:post.title , amount:offer.money , max_date:offer.max_date}
      final.push(obj) ;
      console.log(obj);
   } 
   console.log(final);
   res.status(200).json(final);}
   catch(error){
      res.status(500).json(error);
   }
})
//////////////////////////////////
app.put('/offer/:offer_id',async(req,res)=>{
     try
   { var newOffer = await Offer.findByIdAndUpdate(req.params.offer_id,req.body);
      // var newOffer = req.body;
      // Offer.updateOne()
      res.status(200).json(newOffer);}
      catch(error){
         res.status(500).json(newOffer);
      }

})
app.get('/userprofile/:id',async(req,res)=>{
  try
   {const post = await Post.findById(req.params.id);
   const user = await User.findById(post.user_id);
   res.status(200).json(user)
}
   catch (error){
      console.log(error.message);
      res.status(500).json({message: error.message})
   }

})
app.post('/addoffer',async (req,res)=>{
   try {
      const offer = await Offer.create(req.body) ;
      res.status(200).json(offer);
   }
   catch (error){
      console.log(error.message);
      res.status(500).json({message: error.message})
   }
   
})
app.post('/getrate' , async(req , res)=>
{
   try
   {
      var acc = await Offer.find({"user_id":req.body.user_id , accepted:1}).count() ;
      var all = await Offer.find({"user_id":req.body.user_id}).count() ;
      var ans = acc/all ; 
      res.status(200).json({"rate":ans}) ;
   }
   catch (error) {
      res.status(500).json({message: error.message})
  }
})
app.get('/getonepost/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
         return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});
app.post("/home" , async(req , res)=>
{
   var x , y , z , w ; 
   x = await Offer.find().count() ;
   y = await Post.find().count() ;
   z = await User.find().count() ;
   w = await Offer.find({accepted:1} , {user_id : true}).count(); 
   var obj = {"offer" :  x , "posts" : y , "users" : z , "developers" : w} ;
   res.status(200).json(obj) ;
})
// دالة عروضات بيان 
app.post("/offersuser" , async(req , res)=>
{
   // var alloffer = await Offer.find({user_id : req.body.user_id}).count() ;
   // var accoffer = await Offer.find({user_id : req.body.user_id , accepted : true}).count() ;
   allobj = await Offer.find({user_id : req.body.user_id}) ;
   let final= [] ;
   for (let i=0 ; i<allobj.length ; i++) 
   {
      x=allobj[i] ;
      let zz=await Post.findOne({_id : x.post_id } , {_id:false , title : true}) ;
      y = {"money":x.money , "max_date":x.max_date , "title":zz.title  , "accepted":x.accepted} 
      final.push(y) ;
   }
   res.status(200).json(final) ;

})
app.post('/edituser', async(req, res) => {
   try {
       const user_id = req.body.user_id;
       const user = await User.findByIdAndUpdate(user_id , req.body);
       // we cannot find any product in database
       if(!user){
           return res.status(404).json({message: `cannot find any user with ID ${id}`})
       }
       const updatedUser = await User.findById(user_id);
       res.status(200).json(updatedUser);
       
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})
////////////search/////////
// const allskills=[{ key: '01', label: 'BackEnd' },
//  { key: '01-01', label: 'ProgrammingLanguages' },
//  { key: '01-01-01', label: 'Javascript' },
//  { key: '01-01-02', label: 'PHP' },
//  { key: '01-01-03', label: 'Ruby' },
//  { key: '01-01-04', label: 'Python' },
//  { key: '01-01-05', label: 'Java' },
//  { key: '01-01-06', label: 'Rust' },
//  { key: '01-01-07', label: 'Solidity' },
//  { key: '01-01-08', label: 'Go' },
//  { key: '01-01-09', label: 'Kotlin' },
//  { key: '01-01-10', label: 'Node JS' },
//  { key: '01-02', label: 'FrameWorks' },
//  { key: '01-02-01', label: 'Django' },
//  { key: '01-02-02', label: 'ExpressJS' },
//  { key: '01-02-03', label: 'Laravel' },
//  { key: '01-02-04', label: 'Ruby on Rails' },
//  { key: '01-02-05', label: 'CakePHP' },
//  { key: '01-02-06', label: 'Flask' },
//  { key: '01-02-07', label: 'Asp .NET' },
//  { key: '01-02-08', label: 'Spring Boot' },
//  { key: '01-02-09', label: 'Koa' },
//  { key: '01-02-10', label: 'Phoenix' },
//  { key: '02', label: 'FrontEnd' },
//  { key: '02-01', label: 'ProgrammingLanguages' },
//  { key: '02-01-01', label: 'HTML' },
//  { key: '02-01-02', label: 'CSS' },
//  { key: '02-01-03', label: 'Javascript' },
//  { key: '02-01-04', label: 'React' },
//  { key: '02-01-05', label: 'Vue' },
//  { key: '02-01-06', label: 'TypeScript' },
//  { key: '02-01-07', label: 'Elm' },
//  { key: '02-01-08', label: 'JQuery' },
//  { key: '02-01-09', label: 'Angular' },
//  { key: '02-01-10', label: 'Swift' },
//  { key: '02-02', label: 'FrameWorks' },
//  { key: '02-02-01', label: 'React' },
//  { key: '02-02-02', label: 'Angular' },
//  { key: '02-02-03', label: 'VueJs' },
//  { key: '02-02-04', label: 'JQuery' },
//  { key: '02-02-05', label: 'EmberJs' },
//  { key: '02-02-06', label: 'Backbone.JS' },
//  { key: '02-02-07', label: 'Svelte' },
//  { key: '02-02-08', label: 'Semantic UI' },
//  { key: '02-02-09', label: 'Foundation' },
//  { key: '02-02-10', label: 'Preact' },
//  { key: '03', label: 'FullStack' },
//  { key: '03-01', label: 'ProgrammingLanguages' },
//  { key: '03-01-01', label: 'JavaScript' },
//  { key: '03-01-02', label: 'TypeScript' },
//  { key: '03-01-03', label: 'HTML' },
//  { key: '03-01-04', label: 'CSS' },
//  { key: '03-01-05', label: 'Python' },
//  { key: '03-01-06', label: 'Java' },
//  { key: '03-01-07', label: 'PHP' },
//  { key: '03-01-08', label: 'Go' },
//  { key: '03-01-09', label: 'C++' },
//  { key: '03-01-10', label: 'C#' },
//  { key: '03-01-11', label: 'SQL' },
//  { key: '03-01-12', label: 'MQL' },
//  { key: '03-02', label: 'FrameWorks' },
//  { key: '03-02-01', label: 'Node JS and Express.js' },
//  { key: '03-02-02', label: 'Django ' },
//  { key: '03-02-03', label: 'Angular ' },
//  { key: '03-02-04', label: 'React JS' },
//  { key: '03-02-05', label: 'Spring Boot' },
//  { key: '03-02-06', label: 'Graph QL' },
//  { key: '03-02-07', label: 'Bootstrap' },
//  { key: '03-02-08', label: 'Ruby on Rails' },
//  { key: '03-02-09', label: 'Flask' },
//  { key: '03-02-10', label: 'jQuery' },
//  { key: '03-02-11', label: 'Android SDK' },
//  { key: '03-02-12', label: 'Symfony' },
//  { key: '04', label: 'Learning' },
//  { key: '04-01', label: 'private lesson' },
//  { key: '04-02', label: 'turn' },
//  { key: '05', label: 'clouding' },
//  { key: '05-01', label: 'Amazon' },
//  { key: '05-02', label: 'Google' },
//  { key: '06', label: 'UI/UX' },
//  { key: '06-01', label: 'Web' },
//  { key: '06-02', label: 'Mobile' },
//  { key: '06-03', label: 'Advertisment' },
//  { key: '07', label: 'AI' },
//  { key: '07-01', label: 'ML' },
//  { key: '07-02', label: 'DataScience' },
//  { key: '07-03', label: 'NuralNetwork' },
//  { key: '08', label: 'DataEntry' },
//  { key: '08-01', label: 'Word' },
//  { key: '08-02', label: 'Excel' },
//  { key: '08-03', label: 'DataBase' }]
// app.post('/search', async (req, res) => {
//    try {
//      var searchObj =  req.body;
//      console.log("befor",searchObj.skills);
//      skills=searchObj.skills;
//      description=searchObj.description ;
//      title=req.body.title ; 
//      if (searchObj.web==true){skills.push("Web")}
//      if (searchObj.mobile==true){skills.push("Mobile")}
//      if (searchObj.desktop==true){skills.push("Desktop")}
//      if (searchObj.learning==true){skills.push("Learning")}
//      if (searchObj.uiux==true){skills.push("uiux")}
//      if (searchObj.ai==true){skills.push("AI")}
//      if(skills.length==0)
//      {
//          for(let i=0 ; i<allskills.length ; i++)
//          {
//             if(allskills[i].label==title)  
//                skills.push(allskills[i].label) ;
//          }  
//      }
//      if (searchObj.max_date==""){
//       searchObj.max_date=new Date("2030-01-01")
//      }
//      console.log(skills);
//    //   title=searchObj.title ; 
//      start=searchObj.start ;
//      end=searchObj.end ; 
//      var posts = await Post.find({
//       $and:[
//          {max_date:{$lte:end , $gte:start}} ,         
//       ]
//      });
    
//    //   return res.send("gh") ;
//           ss=[] ;
//      for(let i=0 ; i<posts.length ; i++)
//      {
//          post = posts[i] ;
//          is=1;
//          for(let j=0 ; j<skills.length ; j++)
//          {
//             if(!post.type.includes(skills[j])) is=0 ;
//          }
//          if(post.title.search(title)!=-1 || post.description.search(title)!=-1 || is) ss.push(post)
//          // if(is) ss.push(post) ;
//      }
//      console.log(posts) ;
//      return res.send("rr");
//      posts=ss ;
//      let final = [];
//      for (let i =0; i<posts.length;i++)
//      {
//          x = posts[i];
//          let user = await User.findOne({_id:x.user_id},{ _id:false , fname : true, lname:true})
//          let offers =await Offer.find({post_id:x._id},{_id:false ,money:true});
//          let userName = user.fname+ " " + user.lname;
//          let sum = 0;
//          let count=offers.length;
//          for (let j=0;j<offers.length;j++){
            
//                sum+= offers[j].money;
//          }
//          let avg = sum/count;
//          card = {post_id:x._id,title:x.title,description:x.description,userName:userName,pub_date:x.pub_date,numberOfViews:0,numberOfOrders:count,type:x.type,avgOfOreders:avg}
//          final.push(card);

//      }
//      console.log("after",searchObj);
//      console.log(typeof searchObj.type );
//       //res.status(200).json(posts);
//       res.status(200).json(final);

//    }
//     catch (error) {
//      console.log(error.message);
//     // console.log(searchObj.title);
//      res.status(500).json({ message: error.message });
//    }
//  });
 /////////////////////////////////search
app.post('/search', async (req, res) => {
   try {
     const searchObj =  req.body;
     console.log("befor",searchObj.skills);
     skills=searchObj.skills;
     if (searchObj.web==true){skills.push("Web")}
     if (searchObj.mobile==true){skills.push("Mobile")}
     if (searchObj.desktop==true){skills.push("Desktop")}
     if (searchObj.learning==true){skills.push("Learning")}
     if (searchObj.uiux==true){skills.push("uiux")}
     if (searchObj.ai==true){skills.push("AI")}

     if (searchObj.max_date==""){
      searchObj.max_date=new Date("2030-01-01")
     }
     console.log(skills);
     const posts = await Post.find({
      
      $or:[
         {title: searchObj.title},
         {description:searchObj.title},
          {type: { $in: skills }},
        // {max_date: { $gte:new Date(searchObj.max_date) }}
      ]
     });
     let final = [];
     for (let i =0; i<posts.length;i++)
     {
         x = posts[i];
         let user = await User.findOne({_id:x.user_id},{ _id:false , fname : true, lname:true})
         let offers =await Offer.find({post_id:x._id},{_id:false ,money:true});
         let userName = user.fname+ " " + user.lname;
         let sum = 0;
         let count=offers.length;
         for (let j=0;j<offers.length;j++){
            
               sum+= offers[j].money;
         }
         let avg = sum/count;
         card = {post_id:x._id,title:x.title,description:x.description,userName:userName,pub_date:x.pub_date,numberOfViews:0,numberOfOrders:count,type:x.type,avgOfOreders:avg}
         final.push(card);

     }
     console.log("after",searchObj);
     console.log(typeof searchObj.type );
      //res.status(200).json(posts);
      res.status(200).json(final);

   }
    catch (error) {
     console.log(error.message);
    // console.log(searchObj.title);
     res.status(500).json({ message: error.message });
   }
 });
/////////////////////////test search 
app.post('/search2', async (req, res) => {
   try {
     const searchObj =  req.body;
     console.log("befor",searchObj.skills);
     skills=searchObj.skills;
   //   description=searchObj.description ;
     title=req.body.title ; 
     if (searchObj.web==true){skills.push("Web")}
     if (searchObj.mobile==true){skills.push("Mobile")}
     if (searchObj.desktop==true){skills.push("Desktop")}
     if (searchObj.learning==true){skills.push("Learning")}
     if (searchObj.uiux==true){skills.push("uiux")}
     if (searchObj.ai==true){skills.push("AI")}
     if(skills.length==0)
     {
         for(let i=0 ; i<allskills.length ; i++)
         {
            if(allskills[i].label==title)  
               skills.push(allskills[i].label) ;
         }  
     }
     if (searchObj.max_date==""){
      searchObj.max_date=new Date("2030-01-01")
     }
     console.log(skills);
     start=searchObj.start ;
     end=searchObj.end ; 
     var posts = await Post.find(
         {max_date:{$lte:end , $gte:start}} ,         
      );
     ss=[] ;
     for(let i=0 ; i<posts.length ; i++)
     {
         post = posts[i] ;
         is=0;
         for(let j=0 ; j<skills.length ; j++)
         {
            if(post.skills.includes(skills[j])) is=1 ;
         }
         if(post.title.search(title)!=-1 || post.description.search(title)!=-1 || is) ss.push(post)
     }
     posts=ss ;
     console.log(posts) ;
     let final = [];
   //   for (let i =0; i<posts.length;i++)
   //   {
   //       x = posts[i];
   //       let user = await User.findOne({_id:x.user_id},{ _id:false , fname : true, lname:true})
   //       let offers =await Offer.find({post_id:x._id},{_id:false ,money:true});
   //       let userName = user.fname+ " " + user.lname;
   //       let sum = 0;
   //       let count=offers.length;
   //       for (let j=0;j<offers.length;j++){
            
   //             sum+= offers[j].money;
   //       }
   //       let avg = sum/count;
   //       card = {post_id:x._id,title:x.title,description:x.description,userName:userName,pub_date:x.pub_date,numberOfViews:0,numberOfOrders:count,type:x.type,avgOfOreders:avg}
   //       final.push(card);

   //   }
   //   console.log("after",searchObj);
   //   console.log(typeof searchObj.type );
   //   res.status(200).json(final);
   }
    catch (error) {
     console.log(error.message);
    // console.log(searchObj.title);
     res.status(500).json({ message: error.message });
   }
 });
////////////////////////////////
app.post('/userposts',async(req,res)=>{
   try {
      console.log(req.body.user_id);
       var posts = await Post.find({user_id:req.body.user_id});
      let final = []
      // if (posts.length>0){
      for (let i =0;i<posts.length;i++)
      {
         x = posts[i];
         let user = await User.findOne({_id:x.user_id},{ _id:false , fname : true, lname:true})
         let offers =await Offer.find({post_id:x._id},{_id:false ,money:true});
         let UserName="unknown"
         if (user){
         console.log("fname",user.fname);
          UserName = user.fname+ " " + user.lname;}
         
         let sum = 0;
         let count=offers.length;
         for (let j=0;j<offers.length;j++){
            
               sum+= offers[j].money;
         }
         let avg = sum/count;
         card = {post_id:x.id,title:x.title,description:x.description,userName:UserName,pub_date:x.pub_date,numberOfViews:0,numberOfOrders:count,type:x.type,avgOfOreders:avg}
        // console.log(card);
         final.push(card);

      }
      console.log("final",final);
      console.log("posts",posts);
      res.status(200).json(final);
     
   }
   catch(error){
      res.status(500).json({message: error.message})
   }
})
 app.get('/getAllposts',async(req,res)=>{
   try {
      var posts = await Post.find();
      let final = []
      for (let i =0;i<posts.length;i++)
      {
         x = posts[i];
         let user = await User.findOne({_id:x.user_id},{ _id:false , fname : true, lname:true})
         let offers =await Offer.find({post_id:x._id},{_id:false ,money:true});
         let UserName="unknown"
         if (user){
         console.log("fname",user.fname);
          UserName = user.fname+ " " + user.lname;}
         
         let sum = 0;
         let count=offers.length;
         for (let j=0;j<offers.length;j++){
            
               sum+= offers[j].money;
         }
         let avg = sum/count;
         card = {post_id:x.id,title:x.title,description:x.description,userName:UserName,pub_date:x.pub_date,numberOfViews:0,numberOfOrders:count,type:x.type,avgOfOreders:avg}
        // console.log(card);
         final.push(card);

      }
      console.log("final",final);
      res.status(200).json(final);
   }
   
   catch (error){
      console.log(error.message);
      res.status(500).json({message: error.message});
   }
 })
 app.get('/myPost/:post_id', async(req, res) => {
   try {
      const post_id = req.params.post_id;
      var post = await Post.findOne({_id:post_id});
      var user = await User.findOne({_id:post.user_id} , {_id:true , fname:true , lname:true , photo:true});
      var offers = await Offer.find({post_id:post_id}) ;
       var sum=0 , cnt=0 ;
       for(let i=0 ; i<offers.length ; i++)
       {
         sum+=offers[i].money ;
         cnt++ ;
       }
       const final = {"fname": user.fname  , "lname":user.lname , "photo":user.photo , "avg":sum/cnt , "cnt":cnt, "title":post.title , "description":post.description , "type":post.type , "pub_date":post.pub_date} ;
      //  for (const x in post)
      //  {
      //    final[x]=post[x] ;
      //  }
      //  for (const x in user)
      //  {
      //    final[x]=user[x] ;
      //  }
      //  final["avg"]=sum/cnt ; 
      //  final["cnt"]=cnt ;
      //  final = Object.assign({} , user , post) ;
       res.status(200).json(final);
       
   } catch (error) {
       res.status(500).json({message: error.message})
   }
})


