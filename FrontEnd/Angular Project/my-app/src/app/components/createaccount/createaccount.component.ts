import { ChangeDetectorRef, Component, OnChanges, OnInit,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/Models/country';
import { User } from 'src/app/Models/user';
import { StaticcountryService } from 'src/app/Services/staticcountry.service';
import { UsersService } from 'src/app/Services/users.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { passwordMatch } from 'src/app/customValidator/passwordMatch.Validator';
import { Router } from '@angular/router';
import { Skill } from 'src/app/Models/skill';
import { ProjectLink } from 'src/app/Models/project-link';
import { ListSkillService } from 'src/app/Services/list-skill.service';
import { DatePipe } from '@angular/common';
import { Skiilofusers } from 'src/app/Models/skiilofusers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Data } from 'src/app/Models/data';
import { TreeNode } from 'primeng/api';
import { ListskillService } from 'src/app/Services/listskill.service';
import { DropDownTree, DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';
import { MyDataType } from 'src/app/Models/my-data-type';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  // newUser:User={} as User;

  //newSkill:Skill={} as Skill;
  //newProjectlink:ProjectLink={} as ProjectLink;
  userRegisterForm: FormGroup;

  treeviewData: Object[] = [];
  datasourceFields: Object = "";
  DataFields: Object = '';
  data: Data[] = []

  // 
  selectedSkill :string []=[];
  selectedIds =[];
  selectedValue ='';
  currentUserId='';
  
  @ViewChild ('myTree') myTree ! : DropDownTreeComponent;

  linkInputformcontrol: FormControl = new FormControl(null,
    [ Validators.pattern('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)')]);
  CountryList: Country[] = [];
  nodes: TreeNode[] = [];
  selected: any = '';
  //treeviewData: Object[] = [];
  //datasourceFields: Object = '';
  CountryData: Object[] = [];
  //DataFields: Object = '';
  //data: any[] = [];
  Data: any[] = [];
  selectedDate: any = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  private subscription: Subscription[] = [];  //اذابدي اعمل اكنر من سبسكرايب على اوبزيرفبل وكل واحد لح يرجع سبسكربشن بنفس الكومبوننت

  constructor(private staticcountryservices: StaticcountryService,
    private listskillservice: ListSkillService,
    private http: HttpClient,
    //private UserService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private CDR: ChangeDetectorRef,
    private datePipe: DatePipe,
    private listskill: ListskillService
    ,private authservice:UserAuthService) //فورم بيلدر بوفر علي ماأعمل بكل مرة نيو اوبجيكت
  //in constructor ,//مشان بعد مايأنشئ حساب اخدو ع الصفحة الرئيسية
  {
    this.userRegisterForm = fb.group({
      //id:new FormControl(''),//أول بارمتر الفاليو وثاني بارمتر فاليديشن
      //_id: ['', [Validators.required]],
      fname: ['', [Validators.required]],//, Validators.pattern('/^[\p{Arabic} ]+$/u"{3,}')
      lname: ['', [Validators.required]],//, Validators.pattern('[a-zA-Z]{3,}')
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9,9}')]],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])],
      confirmpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
      //register_date: [''],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      photo: [null],
      //birth_date: ['', [Validators.required]],
      birth_date: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      Skill: [''],
      //skills: [''],
      ProjectLink: fb.array([])
      // Skill: fb.array([
      //   null, [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]
      // ]),
      /*ProjectLink:fb.array ([
       null, [Validators.required, Validators.pattern('/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/')]
      ])
      ^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$*/

    }, { validators: passwordMatch });
 
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

  get fname()//properties read only
  {
    return this.userRegisterForm.get('fname');
  }//بعمل هيك لكل البروبرتيز
  get phone()//properties read only
  {
    return this.userRegisterForm.get('phone');
  }
  get gender()//properties read only
  {
    return this.userRegisterForm.get('gender');
  }
  get confirmpassword()//properties read only
  {
    return this.userRegisterForm.get('confirmpassword');
  }
  get password()//properties read only
  {
    return this.userRegisterForm.get('password');
  }
  get lname()//properties read only
  {
    return this.userRegisterForm.get('lname');
  }
  get city()//properties read only
  {
    return this.userRegisterForm.get('city');
  }
  get photo()//properties read only
  {
    return this.userRegisterForm.get('photo');
  }


  get skill()//properties read only
  {
    return this.userRegisterForm.get('skills') as FormArray;
  }
  get projectLink()//properties read only
  {
    return this.userRegisterForm.get('ProjectLink') as FormArray;
  }
  get birth_date()//properties read only
  {
    return this.userRegisterForm.get('birth_date');
  }


  //دالة الحذف
  DelteINF() {
    this.userRegisterForm.reset();

    this.userRegisterForm = this.fb.group({
      fname: ['', [Validators.required]],//, Validators.pattern('/^[\p{Arabic} ]+$/u"{3,}')
      lname: ['', [Validators.required]],//, Validators.pattern('[a-zA-Z]{3,}')
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9,9}')]],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])],
      confirmpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      photo: [null, [Validators.required]],
      birth_date: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      skill: ['', [Validators.required]],
      ProjectLink: this.fb.array([])
    }, { validators: passwordMatch });

    console.log(this.userRegisterForm.value)
    this.profileImg = null;
    this.selectedDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.CDR.detectChanges();
  }

  // للقائمة
  //selectskill: string[] = [];
  //selectskill: TreeNode[] = [];
  selectskill: any[] = [];
  onChange(event: any) {
    console.log(event)
    this.selectskill = event.value;
    console.log(this.selectskill)

  }
  // getskiilname(id: string) {
  //   return this.data.find(e => e.id == id).name
  // }
  getskiilname(key:TreeNode) {
    return this.Data.find(e => e.key == key).label
  }
  //زر الانشاء


  //console.log(this.userRegisterForm.value)

  //call api,send usermodel
  // const observer = {
  //   next: (userModel: User) => { alert("تم إنشاء الحساب بنجاح"); this.router.navigateByUrl('/mainPage') },
  //   error: (err: Error) => { alert(err.message) }
  // }
  // this.UserService.addUser(userModel).subscribe(observer);
  // if (this.userRegisterForm.valid) {

  // const object = Object.fromEntries(formData as any);
  // const json = JSON.stringify(object);
  // console.log(json);

  isuserlogged:boolean=false;
  SubmitData() {
    //console.log(this.selectskill)
    let userModel: User = this.userRegisterForm.value as User
    //userModel.Skill = this.selectskill.map(skill => this.getskiilname(skill))
   //console.log(userModel);
    const names= userModel['Skill'] as unknown as MyDataType[] ;
    console.log(names);
   const skillnames = names.map(item => item.label || item.children?.map(child => child.label)).flat();
   let skillnamesupdated = skillnames.filter((item):item is string => Boolean(item))
   userModel.Skill=skillnamesupdated
   console.log("skill",skillnamesupdated);
    console.log("user obj ",userModel.Skill);
    this.authservice.Createaccount(userModel)
       this.isuserlogged=this.authservice.isUserLogged
    



    // Create FormData object
    const formData = new FormData();
    //Add all fields from userModel to formData
    Object.keys(userModel).forEach(key => {
      if(Array.isArray(userModel[key])){
        userModel[key].forEach((e:any)=>{
          formData.append(key,e);
        })
      }
      else{
        formData.append(key, userModel[key]);
      }
      

    });
    
    // Add photo file to formData

    // const photo = this.userRegisterForm.get('photo');
    // if (!photo?.value) {

    //   alert('يجب تحديد صورة');
    //   return;
    // }

    const httpoption =
      { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) }
      console.log(formData);

    this.userRegisterForm = this.fb.group({
      fname: ['', [Validators.required]],//, Validators.pattern('/^[\p{Arabic} ]+$/u"{3,}')
      lname: ['', [Validators.required]],//, Validators.pattern('[a-zA-Z]{3,}')
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9,9}')]],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])],
      confirmpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      // photo: [null, [Validators.required]],
      birth_date: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      skills: ['', [Validators.required]],
      ProjectLink: this.fb.array([])
    }, { validators: passwordMatch });
    this.selectskill = [];
    this.CDR.detectChanges();
    //console.log(this.selectskill)
    this.userRegisterForm.reset();

    //   let skillModel: Skill = this.userRegisterForm.value.Skill as Skill
    //   const observer1 = {
    //     next: (skillModel: Skill) => { },
    //     error: (err: Error) => { alert(err.message) }
    //   }
    //  this.UserService.addSkill(skillModel).subscribe(observer1);
    //   let skillofusersModel: Skiilofusers = (this.userRegisterForm.value._id && this.skillInputformcontrol.value._id) as Skiilofusers
    //   const observer2 = {
    //     next: (skillofusersModel: Skiilofusers) => { },
    //     error: (err: Error) => { alert(err.message) }
    //   }
    //  this.UserService.addSkillOfUsers(skillofusersModel).subscribe(observer2);

    // const observer2 = {
    //   next: (projectlinkModel: ProjectLink) => { },
    //   error: (err: Error) => { alert(err.message) }
    // }
    // let projectlinkModel: ProjectLink = this.userRegisterForm.value.projectLink as ProjectLink
    // this.UserService.addProjectLink(projectlinkModel).subscribe(observer2);
  }

  ngOnInit(): void {
    this.isuserlogged=this.authservice.isUserLogged
    this.getAllSkills();
    this.getAllskill();
    this.getSkill();
    this.CountryList = this.staticcountryservices.getAllCountry()
    this.DataFields = this.staticcountryservices.getAllcountry()
    this.treeviewData = this.listskillservice.getALLSkill()
    this.datasourceFields = this.listskillservice.getALLskill()
    //this.data = this.listskillservice.getSkill()
    //this.CountryData = this.staticcountryservices.getAllContry()
    this.nodes = this.listskill.getALLSkill()
    this.selected = this.listskill.getALLskill()
    this.Data = this.listskill.getSkill()

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

  
   
  
   

  //this.UserService.addUser(this.newUser).subscribe(observer);//,this.newSkill,this.newProjectlink
  // this.newUser=this.UserService.addUser(this.newUser).subscribe((newUser)=>{
  //use toast,bootstrap alert,snakbar in angular
  //لح ينفذها بحالة مافي اغلاط
  //this.router.navigateByUrl('/homepage')
  //})

  //this.suscription.push(الاوبزرفبل يلي عملتو);
  ngOnDestroy() {

    //بدي اهدم الاوبزرفبل لما اطلع من الكومبوننت
    //for (let subscription of this.subscription) { subscription.unsubscribe(); }

  }
  /*
addUser()
{
 //this.userRegisterForm.get('fname')?.setValue('test');//ل انبوت معين
 //call api to get user profile
 this.userRegisterForm.setValue({//must provide all properties
   //للفورم كلو
 fname:'hh',
 phone:'0987'
 })
 this.userRegisterForm.patchValue({//can provide some properties

   fname:'hh',
 })
 const observer={
   next:(newUser:User)=>{alert("jjjj")} ,
   error:(err:Error)=>{alert(err.message)}
 }
 this.UserService.addUser(this.newUser).subscribe(observer);
}*/

  addProjectLinks() {

    if (this.linkInputformcontrol.valid) {
      (this.userRegisterForm.get('ProjectLink') as FormArray)?.push(new FormControl(this.linkInputformcontrol.value))
      this.linkInputformcontrol.reset('');
      //console.log(this.userRegisterForm.value)
    }

  }//push(new FormControl([null, [Validators.required, Validators.pattern('/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/')]]))
  removeData(idx: number) {
    this.projectLink.removeAt(idx);

  }
  addSkills() {
    const skills = this.userRegisterForm.get('skills')?.value;
    // const SkillsList=[];
    // skills.array.forEach(element => {
    //   SkillsList.push({
    //     id:element,name:this.data.find(e=>e.id==element).name
    //   })
    // });
  }
  RemoveData(id: number) {
    this.skill.removeAt(id);
  }

  visible: boolean = true;
  changetype: boolean = true;
  visible1: boolean = true;
  changetype1: boolean = true;
  viewpass() {
    this.visible = !this.visible
    this.changetype = !this.changetype
  }

  viewpass1() {
    this.visible1 = !this.visible1
    this.changetype1 = !this.changetype1
  }
  profileImg: any = null;
  onFileSelect(event: any) {
    const file = event.target.files[0];
    //console.log(file);

    this.userRegisterForm.patchValue({ photo: file });
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.profileImg = reader.result as string
        this.CDR.detectChanges();
        //console.log(this.profileImg);
        console.log(this.userRegisterForm.value);
      }

    }
    event.target.value = '';

  }

}
