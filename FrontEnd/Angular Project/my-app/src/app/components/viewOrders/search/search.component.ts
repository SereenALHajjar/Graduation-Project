import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormArray, FormBuilder} from '@angular/forms';
import { ListSkillService } from 'src/app/Services/list-skill.service';
import { SearchService } from 'src/app/Services/search.service';
import { Search } from 'src/app/ViewModels/search';
import {Data } from 'src/app/Models/data';
import { DropDownTree, DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DatePipe } from '@angular/common';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { MyDataType } from 'src/app/Models/my-data-type';
import { PostCard } from 'src/app/ViewModels/post-card';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit ,OnChanges , AfterViewInit{
  searchForm : FormGroup;
  selectedNodeArray:TreeSelectModule =[];




  treeviewData: Object[] = [];
  datasourceFields: Object = "";
  DataFields: Object = '';
  data: Data[] = [
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
];
  selectedSkill :string []=[];
  selectedIds =[];
  selectedValue ='';
  currentUserId='';
  
  @ViewChild ('myTree') myTree ! : DropDownTreeComponent;
   searchresult:PostCard[]=[];


  constructor(private searchService : SearchService
             ,private listskillservice:ListSkillService
             ,private http :HttpClient
             ,private fb:FormBuilder
             ,private datePipe:DatePipe
             ,private CurrentUser:CurrentUserService ) { 

              this.searchForm = new FormGroup({
                //subgroup: new FormArray([]),
                title: new FormControl(''),
                web: new FormControl(''),
                mobile:new FormControl(''),
                desktop:new FormControl(''),
                learning:new FormControl(''),
                uiux:new FormControl(''),
                ai:new FormControl(''),
                skills:new FormControl(''),
                start:new FormControl(this.datePipe.transform(new Date(), "yyyy-MM-dd")),
                end:new FormControl(this.datePipe.transform(new Date(), "yyyy-MM-dd")),
                city:new FormControl(''),
                
              });

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
    // this.treeviewData = this.listskillservice.getALLSkill();
    // this.datasourceFields = this.listskillservice.getALLskill();
    // this.data = this.listskillservice.getSkill();
    //this.startSearch()
    
    this.getAllSkills();
    this.getAllskill();
    this.getSkill();
    console.log(this.selectedSkill);
    console.log(this.selectedIds);
    
    //this.idEmmiter.subscribe((userId:string)=>
    // this.currentUserId=userId;)
    
    
  }
  ngAfterViewInit(){
    
  //   this.myTree.change.subscribe((args:any)=>{
  //   this.selectedIds = args.value
  //   this.getSkillsList(this.selectedIds)
  //   console.log(args.value)
  // console.log(this.selectedIds)
  // console.log(this.selectedSkill);});
  console.log("in ngAfterView Init ",this.selectedNodeArray);
  }
 
  selectNode(){
    // this.myTree.change.subscribe((args:any)=>{
    //   this.selectedIds = args.value
    //   this.getSkillsList(this.selectedIds)
    //   console.log(args.value)
    // console.log(this.selectedIds)
    // console.log(this.selectedSkill);});
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
  ngOnChanges(change:SimpleChanges) {
    console.log("changes");
    if(change['selectedIds']){
      console.log(this.selectedIds);
    }

    //this.addValue()
    // this.selectedSkill = event.value;
    
  }
  // onChange (event:string){
  //   // this.selectedSkill .push(event) ;
  //   // console.log(this.selectedSkill);
  // }
  startSearch (){
    let searchObj:Search = this.searchForm.value as Search
   // searchObj.skills = this.selectedSkill;
    //console.log("after start search ",this.selectedNodeArray);
   // const skillnames = searchObj['skills'].map(item => item.label || item.children.map(child => child.label)).flat();
   const names= searchObj['skills'] as unknown as MyDataType[] ;
   console.log("names",names);
   const skillnames = names.map(item => item.label || item.children?.map(child => child.label)).flat();
   let skillnamesupdated = skillnames.filter((item):item is string => Boolean(item))
    console.log(searchObj['skills']);
    console.log("skillNames ",skillnames)
    console.log("skillNames updated ",skillnamesupdated)
    let postSearch :Search = {
    title:searchObj.title,
    web:searchObj.web,
    mobile:searchObj.mobile,
    desktop:searchObj.desktop,
    learning:searchObj.learning,
    uiux: searchObj.uiux,
    ai:searchObj.ai,
    skills:skillnamesupdated,
    start:searchObj.start,
    end:searchObj.end,
    city:searchObj.city
    }
    // if(skillnames){
   // searchObj['skills']!=skillnames as string[];
    console.log( "skills in search obj after " ,postSearch['skills']);
      this.searchService.searchPost(postSearch).subscribe((data:any) =>{
        console.log("returned data :",data)
        this.searchresult=data;
        this.selectedSkill=[];
  this.DelteINF();
  this.searchForm.get('max_date')?.setValue('');
        console.log("search result",this.searchresult);
        if (data.status){

          console.log("successful");
        }
        else {
          console.log("error");
        }
      });
      // this.http.post<any>("http://localhost:3000/search",searchObj).subscribe((data:any) =>{
      //     console.log(data)
      //     if (data.status){
      //       console.log("successful");
      //     }
      //     else {
      //       console.log("error");
      //     }
        // });
      
      // this.searchForm.reset();
      console.log(postSearch);
      
  }
 DelteINF(){
  this.searchForm.reset();
  this.searchForm = this.fb.group ({
    title:[''],
    web:[''],
    mobile:[''],
    desktop:[''],
    learning:[''],
    uiux:[''],
    skills:[''],
    ai:[''],
    start:[this.datePipe.transform(new Date(), "yyyy-MM-dd")],
    end:[this.datePipe.transform(new Date(), "yyyy-MM-dd")],
    city:['']

  })
 }
  //   const searchgroup = new FormGroup({
  //               title: new FormControl(''),
  //               web: new FormControl(''),
  //               mobile:new FormControl(''),
  //               desktop:new FormControl(''),
  //               learning:new FormControl(''),
  //               uiux:new FormControl(''),
  //               ai:new FormControl(''),
  //               skills:new FormControl(''),
  //               max_date:new FormControl(''),
  //               city:new FormControl(''),
  //   });
  //   (this.searchForm.get('subgroup') as FormArray )?.push(searchgroup)
  //   this.searchForm.reset('');
  // }
  // deleteItem(id : number){
  //   this.subgroup.removeAt(id);
  // }

 getSkillname(id:string){
  const res =this.data.find(e => e.key == id);
  if (res){
    return res.label
  }
  else {
    return null
  }
 }
 getSkillsList (ids:any[]){
  //this.searchForm.get('skills')?.patchValue()
  
  for (let id of ids){
    let name = this.getSkillname(id);
    if(name){
    this.selectedSkill.push(name)}
    else {continue;}

  }
 }

 onTagPressed(tag:string){
  this.selectedSkill=[];
  this.DelteINF();
  this.searchForm.get('max_date')?.setValue('');
  // this.selectedSkill.push(tag);
  // this.startSearch();
  let tagname :string[]=[] ;
  tagname.push(tag); 
  let postSearch :Search = {
    title:"",
    web:"",
    mobile:"",
    desktop:"",
    learning:"",
    uiux: "",
    ai:"",
    skills:tagname,
    start:this.searchForm.get('start')?.value,
    end:this.searchForm.get('end')?.value,
    city:""
    }
    this.searchService.searchPost(postSearch).subscribe((data:any) =>{
      console.log(data)
      this.searchresult=data;
      if (data.status){
        console.log("successful");
        this.selectedSkill=[];
  this.DelteINF();
  this.searchForm.get('max_date')?.setValue('');
      }
      else {
        console.log("error");
      }
    });
 

 }

 
}



