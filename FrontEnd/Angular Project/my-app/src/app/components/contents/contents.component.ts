import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostServicesService  } from 'src/app/Services/postservice.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/Models/post';
import { TreeSelectModule } from 'primeng/treeselect';
import { Data } from 'src/app/Models/data';
import { DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';
import { MyDataType } from 'src/app/Models/my-data-type';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  // private treeviewData: Object[];
  // public datasourceFields: Object;
  orderForm: FormGroup;
  selectedNodeArray:TreeSelectModule =[];




  treeviewData: Object[] = [];
  datasourceFields: Object = "";
  DataFields: Object = '';
  data: Data[] = [
    {key:'03' ,label: 'AI' },
    { key: '03-01', label: 'Datascience' },
    { key: '03-02', label: 'MachineLearning' },
    { key: '03-03', label: 'Nural Network' },
    { key: '03-04', label: 'Others' },
    {key:'04',label:'clouding'},
    { key: '04-01', label: 'Amazon' },
    { key: '04-02', label: 'Google' },
    { key: '04-03', label: 'Others' },
    {key: '05', label: 'Data Entry'},
    { key: '05-01', label: 'Data Base' },
    { key: '05-02', label: 'Excel' },
    { key: '05-03', label: 'Word' },
    { key: '05-04', label: 'Others' },
    {key: '06', label: 'Desktop'},
    { key: '06-01', label: 'Linux' },
    { key: '06-02', label: 'Unix' },
    { key: '06-03', label: 'Windows' },
    { key: '06-04', label: 'Others' },
    {key: '07', label: 'Design(UI/UX)'},
    { key: '07-01', label: 'Advertisment' },
    { key: '07-02', label: 'Desktop' },
    { key: '07-03', label: 'Mobile' },
    { key: '07-04', label: 'Web' },
    { key: '07-05', label: 'Others' },
    {key: '08', label: 'Mobile'},
    { key: '08-01', label: 'Android' },
    { key: '08-02', label: 'Ios' },
    { key: '08-03', label: 'Windows' },
    { key: '08-04', label: 'Others' },
    {key: '09', label: 'Web'},
    { key: '09-01', label: 'Back' },
    { key: '09-02', label: 'Front' },
    { key: '09-03', label: 'Full Stack' },
    { key: '09-04', label: 'Others' }
];
  selectedSkill :string []=[];
  selectedIds =[];
  selectedValue ='';
  currentUserId='';
  
  @ViewChild ('myTree') myTree ! : DropDownTreeComponent;
  


  constructor(private fb: FormBuilder,private  PostServicesService: PostServicesService
     ,private router: Router,private datePipe: DatePipe ) 
  {
    console.log(localStorage.getItem("ID"));
    this.orderForm = fb.group({
      user_id:[localStorage.getItem("ID")],
      type: ['', [Validators.required]],
      max_date: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      description: ['', [Validators.maxLength(4)]],
      title: ['', [Validators.required, Validators.maxLength(4)]]
    });
    //  console.log()
    this.data = [
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

this.treeviewData = [
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

  ngOnInit(): void {
    this.getAllSkills();
    this.getAllskill();
    this.getSkill();
    console.log(this.selectedSkill);
    console.log(this.selectedIds);
  }

  getAllSkills():object []{
    console.log(this.treeviewData);
    return this.treeviewData;
    
  }
  getAllskill():object{
    console.log(this.datasourceFields);
    return this.datasourceFields;
  }
  getSkill ():object []{
    console.log(this.data);
    return this.data
  }
  get description() { return this.orderForm.get('description') }
  get max_date() { return this.orderForm.get('max_date') }
  get type() { return this.orderForm.get('type') }
  get title() { return this.orderForm.get('title') }

  cancelpost(){

    this.orderForm.reset();
    this.orderForm = this.fb.group({
      type: ['', [Validators.required]],
      max_date: ['', [Validators.required]],
      description: ['', [Validators.maxLength(4)]],
      title: ['', [Validators.required, Validators.maxLength(4)]]
    });
   

   
  }
  
  publish(){
    let postModel: Post = this.orderForm.value as Post
    const names= postModel['type'] as unknown as MyDataType[] ;
   const skillnames = names.map(item => item.label || item.children?.map(child => child.label)).flat();
   let skillnamesupdated = skillnames.filter((item):item is string => Boolean(item))
    console.log(postModel['type']);
    console.log("skillNames ",skillnames)
    console.log("skillNames updated ",skillnamesupdated)
    let postModelUpdated : Post = {
     
      
      user_id : postModel.user_id,
      title:postModel.title,
      description:postModel.description,
      type:skillnamesupdated,
      max_date : postModel.max_date,
      pub_date: new Date,

    }
    console.log(postModelUpdated);
    const observer={
      next:(postModelUpdated:Post)=>{
        Swal.fire({
          position:'top',
          icon:'success',
          title:'  تم نشر طلبك بنجاح    ',
          showConfirmButton:false,
          timer:1500
        })
        //alert("post published successfuly");
    this.router.navigateByUrl('/myprofile');},error: (err: Error) => { 
      Swal.fire({
        position:'top',
        icon:'success',
        title:'  حدث خطأ ما       ',
        showConfirmButton:false,
        timer:1500
      })
      
      //alert(err.message)
     } 

    }
    this.PostServicesService.addPost(postModelUpdated).subscribe(observer)



  }


}
