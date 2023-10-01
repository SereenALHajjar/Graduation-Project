import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StaticcountryService } from 'src/app/Services/staticcountry.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import {User} from 'src/app/Models/user'


import { Skill } from 'src/app/Models/skill';
import { ProjectLink } from 'src/app/Models/project-link';
import { ListSkillService } from 'src/app/Services/list-skill.service';
import { DatePipe } from '@angular/common';
import { Skiilofusers } from 'src/app/Models/skiilofusers';
import { UsersService } from 'src/app/Services/users.service';
import { Subscription } from 'rxjs';
import {Country } from 'src/app/Models/country';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Data } from 'src/app/Models/data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
CountryList:Country[]=[];
data: Data[] = []
// photoPath = path.join(__dirname, 'assets', 'Component 1.png');
 UserObj !: User ;
//   _id:1,
//   fname:"محمد",
//   lname:"المحمد",
//   phone:"0999654789",
//   password:"1234588788",
//   confirmpassword:"1234588788",

//   gender:"ذكر",
//   city:"حمص",
//   photo:"",
//   birth_date:  new Date(Date.now()),
//   Skill:["python","java","c++", "nodejs"],
//   ProjectLink:["ddddd@gmail.com ","gggg@github ","ssssssss@nnnnnn"],
  
// };

 treeviewData: Object[];
  public datasourceFields: Object;
  // linkInputformcontrol: FormControl = new FormControl(null,
  //   [Validators.required])
  editForm:FormGroup;
  linkInputformcontrol: FormControl = new FormControl(null,
    [Validators.required]);
  constructor(private UserService: UsersService,
     private CDR:ChangeDetectorRef,
      private fb: FormBuilder,
      private staticcountryservices:StaticcountryService
      ,private datePipe:DatePipe
      ,private sanitizer: DomSanitizer
      ,private http : HttpClient) { 

        let user_id = "64d77b19fddd90a35a978ca8";
     this.http.post<User>("http://localhost:9992/getuserInfo",{user_id:user_id}).subscribe((user)=>
     this.UserObj=user);
       // this.UserService.getUsersByID(this.UserObj._id).subscribe( user =>this.UserObj = user )
        
    //اتعبئة الفورم أستطيع استخدام setvalue موجودة بالفيديو رقم 24
this.editForm=fb.group({
  
  fname: [this.UserObj.fname, ],//fb.control('')
  lname: [this.UserObj.lname, ],
  phone: [this.UserObj.phone, ],
  gender: [this.UserObj.gender, ],
  city: [this.UserObj.city,],
  photo: [this.UserObj.photo, ],
  birth_date:[this.UserObj.birth_date, ] ,
 //birth_date:new FormControl(this.datePipe.transform(this.UserObj.birth_date,"")),
 //birth_date:[, ] , 
  Skill: [''],
  
  // ProjectLink: fb.array([])
 
  ProjectLink: fb.array(this.UserObj.ProjectLink,)




  
})    
    

this.data=[
  { key: '01', label: 'BackEnd' },
  { key: '01-01', label: 'ProgrammingLanguages' },
  { key: '01-01-01', label: 'Javascript' },
  { key: '01-01-02', label: 'PHP' },
  { key: '01-01-03', label: 'Ruby' },
  { key: '01-01-04', label: 'Python' },
  { key: '01-01-05', label: 'Java' },
  { key: '01-01-06', label: 'Rust' },
  { key: '01-01-07', label: 'Solidity' },
  { key: '01-01-08', label: 'Go' },
  { key: '01-01-09', label: 'Kotlin' },
  { key: '01-01-10', label: 'Node JS' },
  { key: '01-02', label: 'FrameWorks' },
  { key: '01-02-01', label: 'Django' },
  { key: '01-02-02', label: 'ExpressJS' },
  { key: '01-02-03', label: 'Laravel' },
  { key: '01-02-04', label: 'Ruby on Rails' },
  { key: '01-02-05', label: 'CakePHP' },
  { key: '01-02-06', label: 'Flask' },
  { key: '01-02-07', label: 'Asp .NET' },
  { key: '01-02-08', label: 'Spring Boot' },
  { key: '01-02-09', label: 'Koa' },
  { key: '01-02-10', label: 'Phoenix' },
  { key: '02', label: 'FrontEnd' },
  { key: '02-01', label: 'ProgrammingLanguages' },
  { key: '02-01-01', label: 'HTML' },
  { key: '02-01-02', label: 'CSS' },
  { key: '02-01-03', label: 'Javascript' },
  { key: '02-01-04', label: 'React' },
  { key: '02-01-05', label: 'Vue' },
  { key: '02-01-06', label: 'TypeScript' },
  { key: '02-01-07', label: 'Elm' },
  { key: '02-01-08', label: 'JQuery' },
  { key: '02-01-09', label: 'Angular' },
  { key: '02-01-10', label: 'Swift' },
  { key: '02-02', label: 'FrameWorks' },
  { key: '02-02-01', label: 'React' },
  { key: '02-02-02', label: 'Angular' },
  { key: '02-02-03', label: 'VueJs' },
  { key: '02-02-04', label: 'JQuery' },
  { key: '02-02-05', label: 'EmberJs' },
  { key: '02-02-06', label: 'Backbone.JS' },
  { key: '02-02-07', label: 'Svelte' },
  { key: '02-02-08', label: 'Semantic UI' },
  { key: '02-02-09', label: 'Foundation' },
  { key: '02-02-10', label: 'Preact' },
  { key: '03', label: 'FullStack' },
  { key: '03-01', label: 'ProgrammingLanguages' },
  { key: '03-01-01', label: 'JavaScript' },
  { key: '03-01-02', label: 'TypeScript' },
  { key: '03-01-03', label: 'HTML' },
  { key: '03-01-04', label: 'CSS' },
  { key: '03-01-05', label: 'Python' },
  { key: '03-01-06', label: 'Java' },
  { key: '03-01-07', label: 'PHP' },
  { key: '03-01-08', label: 'Go' },
  { key: '03-01-09', label: 'C++' },
  { key: '03-01-10', label: 'C#' },
  { key: '03-01-11', label: 'SQL' },
  { key: '03-01-12', label: 'MQL' },
  { key: '03-02', label: 'FrameWorks' },
  { key: '03-02-01', label: 'Node JS and Express.js' },
  { key: '03-02-02', label: 'Django ' },
  { key: '03-02-03', label: 'Angular ' },
  { key: '03-02-04', label: 'React JS' },
  { key: '03-02-05', label: 'Spring Boot' },
  { key: '03-02-06', label: 'Graph QL' },
  { key: '03-02-07', label: 'Bootstrap' },
  { key: '03-02-08', label: 'Ruby on Rails' },
  { key: '03-02-09', label: 'Flask' },
  { key: '03-02-10', label: 'jQuery' },
  { key: '03-02-11', label: 'Android SDK' },
  { key: '03-02-12', label: 'Symfony' },
  { key: '04', label: 'Learning' },
  { key: '04-01', label: 'private lesson' },
  { key: '04-02', label: 'turn' },
  { key: '05', label: 'clouding' },
  { key: '05-01', label: 'Amazon' },
  { key: '05-02', label: 'Google' },
  { key: '06', label: 'UI/UX' },
  { key: '06-01', label: 'Web' },
  { key: '06-02', label: 'Mobile' },
  { key: '06-03', label: 'Advertisment' },
  { key: '07', label: 'AI' },
  { key: '07-01', label: 'ML' },
  { key: '07-02', label: 'DataScience' },
  { key: '07-03', label: 'NuralNetwork' },
  { key: '08', label: 'DataEntry' },
  { key: '08-01', label: 'Word' },
  { key: '08-02', label: 'Excel' },
  { key: '08-03', label: 'DataBase' },
]
this.treeviewData =[
  {
    key: '01', label: 'BackEnd',
    children: [
          { key: '01-01', label: 'Javascript' },
          { key: '01-02', label: 'PHP' },
          { key: '01-03', label: 'Ruby' },
          { key: '01-04', label: 'Python' },
          { key: '01-05', label: 'Java' },
          { key: '01-06', label: 'Rust' },
          { key: '01-07', label: 'Solidity' },
          { key: '01-08', label: 'Go' },
          { key: '01-09', label: 'Kotlin' },
          { key: '01-10', label: 'Node JS' },
          { key: '01-11', label: 'Django' },
          { key: '01-12', label: 'ExpressJS' },
          { key: '01-13', label: 'Laravel' },
          { key: '01-14', label: 'Ruby on Rails' },
          { key: '01-15', label: 'CakePHP' },
          { key: '01-16', label: 'Flask' },
          { key: '01-17', label: 'Asp .NET' },
          { key: '01-18', label: 'Spring Boot' },
          { key: '01-19', label: 'Koa' },
          { key: '01-20', label: 'Phoenix' }
    ]
  },
  {
    key: '02', label: 'FrontEnd',
    children: [
          { key: '02-01', label: 'HTML' },
          { key: '02-02', label: 'CSS' },
          { key: '02-03', label: 'Javascript' },
          { key: '02-04', label: 'React' },
          { key: '02-05', label: 'Vue' },
          { key: '02-06', label: 'TypeScript' },
          { key: '02-07', label: 'Elm' },
          { key: '02-08', label: 'JQuery' },
          { key: '02-09', label: 'Angular' },
          { key: '02-10', label: 'Swift' },
          { key: '02-11', label: 'React' },
          { key: '02-12', label: 'Angular' },
          { key: '02-13', label: 'VueJs' },
          { key: '02-14', label: 'JQuery' },
          { key: '02-15', label: 'EmberJs' },
          { key: '02-16', label: 'Backbone.JS' },
          { key: '02-17', label: 'Svelte' },
          { key: '02-18', label: 'Semantic UI' },
          { key: '02-19', label: 'Foundation' },
          { key: '02-20', label: 'Preact' }
    ]
  },
  {
    key: '03', label: 'FullStack',
    children: [
          { key: '03-01-01', label: 'JavaScript' },
          { key: '03-01-02', label: 'TypeScript' },
          { key: '03-01-03', label: 'HTML' },
          { key: '03-01-04', label: 'CSS' },
          { key: '03-01-05', label: 'Python' },
          { key: '03-01-06', label: 'Java' },
          { key: '03-01-07', label: 'PHP' },
          { key: '03-01-08', label: 'Go' },
          { key: '03-01-09', label: 'C++' },
          { key: '03-01-10', label: 'C#' },
          { key: '03-01-11', label: 'SQL' },
          { key: '03-01-12', label: 'MQL' },
          { key: '03-02-01', label: 'Node JS and Express.js' },
          { key: '03-02-02', label: 'Django ' },
          { key: '03-02-03', label: 'Angular ' },
          { key: '03-02-04', label: 'React JS' },
          { key: '03-02-05', label: 'Spring Boot' },
          { key: '03-02-06', label: 'Graph QL' },
          { key: '03-02-07', label: 'Bootstrap' },
          { key: '03-02-08', label: 'Ruby on Rails' },
          { key: '03-02-09', label: 'Flask' },
          { key: '03-02-10', label: 'jQuery' },
          { key: '03-02-11', label: 'Android SDK' },
          { key: '03-02-12', label: 'Symfony' }
    ]
  },
  {
    key: '04', label: 'Learning',
    children: [
      { key: '04-01', label: 'private lesson' },
      { key: '04-02', label: 'turn' }
    ]
  },
  {
    key: '05', label: 'clouding',
    children: [
      { key: '05-01', label: 'Amazon' },
      { key: '05-02', label: 'Google' }
    ]
  },
  {
    key: '06', label: 'UI/UX',
    children: [
      { key: '06-01', label: 'Web' },
      { key: '06-02', label: 'Mobile' },
      { key: '06-03', label: 'Advertisment' }
    ]
  },
  {
    key: '07', label: 'AI',
    children: [
      { key: '07-01', label: 'ML' },
      { key: '07-02', label: 'DataScience' },
      { key: '07-03', label: 'NuralNetwork' }
    ]
  },
  {
    key: '08', label: 'DataEntry',
    children: [
      { key: '08-01', label: 'Word' },
      { key: '08-02', label: 'Excel' },
      { key: '08-03', label: 'DataBase' }
    ]
  }
]
this.datasourceFields = {
  dataSource: this.treeviewData, value: 'key', text: 'label', child: 'children'
}

}
  // onDateChange(dateString: string) {
  //   this.UserObj.birth_date = new Date(dateString);
  // }
  ngOnInit(): void {
    this.CountryList=this.staticcountryservices.getAllCountry()
    const photoPath = '../../../assets/Component 1.png';
    const photoUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(photoPath);
    this.UserObj.photo = photoUrl.toString();
    // let user_id = "64d77b19fddd90a35a978ca8";
    //  this.http.post<User>("http://localhost:9992/getuserInfo",{user_id:user_id}).subscribe((user)=>
    //  this.UserObj=user);
//     this.editForm.patchValue({
//   fname:"محمد",
//   lname:"المحمد",
//   phone:"0999654789",
//   password:"1234588788",
//   confirmpassword:"1234588788",

//   gender:"ذكر",
//   city:"حمص",
//   photo:"اا",
//   birth_date:  new Date(Date.now()),
//   Skill:["python","java","c++", "nodejs"],
//   ProjectLink:["ddddd@gmail.com ","gggg@github ","ssssssss@nnnnnn"],
  

// })

    
  }
  //properties read only
  get fname(){return this.editForm.get('fname');}//بعمل هيك لكل البروبرتيز
   //properties read only
  get lname(){return this.editForm.get('lname');}

 //properties read only
  get phone(){return this.editForm.get('phone');}

  //properties read only
  get gender() {return this.editForm.get('gender');}
   //properties read only
  get city(){return this.editForm.get('city');}
 
  //properties read only
  get photo() {return this.editForm.get('photo');}
  //properties read only
  // get projectLink(){return this.editForm.get('ProjectLink') as FormArray;}
  get projectLink()//properties read only
  {
    return this.editForm.get('ProjectLink') as FormArray;
  }
  // كود راما للصورة الأخير
  profileImg:any=null;
  onFileSelect(event:any){
    const file= event.target.files[0];
   this.editForm.patchValue({photo:file});
    const allowedFileTypes=["image/png","image/jpeg","image/jpg","image/gif"];
    if(file&&allowedFileTypes.includes(file.type)){
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>{
        this.profileImg=reader.result as string
        this.CDR.detectChanges();
        console.log(this.editForm.value);
      }
   
    }
  }
 
//انتهاء كود الصورة
fillform(){this.editForm.patchValue ({
 
  fname:'bayan',
  lname:'bairakdar',
  phone:'0988596276',
  gender:'female',
  city:'homs',
  birth_date:'1/12/2001',


})}
  // call API to get user_profile
  addProjectLinks() {

    if (this.linkInputformcontrol.valid) {
      (this.editForm.get('ProjectLink') as FormArray)?.push(new FormControl(this.linkInputformcontrol.value))
      this.linkInputformcontrol.reset('');
      //console.log(this.userRegisterForm.value)
    }

  }

  
  
    Submit_edit(){ 
      let userModel: User = this.editForm.value as User

    }
    Delte_edit(){ }
    removeData(idx: number) {
      this.projectLink.removeAt(idx);
  
    }

}
