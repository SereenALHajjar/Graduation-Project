import { Injectable } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data'

@Injectable({
  providedIn: 'root'
})
export class ListSkillService {
  private remoteData: DataManager = new DataManager({
    url: 'http://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  private treeviewData: Object[];
  private datasourceFields: Object;
  private data = [
    { id: '01', name: 'BackEnd' },
    { id: '01-01', name: 'ProgrammingLanguages' },
    { id: '01-01-01', name: 'Javascript' },
    { id: '01-01-02', name: 'PHP' },
    { id: '01-01-03', name: 'Ruby' },
    { id: '01-01-04', name: 'Python' },
    { id: '01-01-05', name: 'Java' },
    { id: '01-01-06', name: 'Rust' },
    { id: '01-01-07', name: 'Solidity' },
    { id: '01-01-08', name: 'Go' },
    { id: '01-01-09', name: 'Kotlin' },
    { id: '01-01-10', name: 'Node JS' },
    { id: '01-02', name: 'FrameWorks' },
    { id: '01-02-01', name: 'Django' },
    { id: '01-02-02', name: 'ExpressJS' },
    { id: '01-02-03', name: 'Laravel' },
    { id: '01-02-04', name: 'Ruby on Rails' },
    { id: '01-02-05', name: 'CakePHP' },
    { id: '01-02-06', name: 'Flask' },
    { id: '01-02-07', name: 'Asp .NET' },
    { id: '01-02-08', name: 'Spring Boot' },
    { id: '01-02-09', name: 'Koa' },
    { id: '01-02-10', name: 'Phoenix' },
    { id: '02', name: 'FrontEnd' },
    { id: '02-01', name: 'ProgrammingLanguages' },
    { id: '02-01-01', name: 'HTML' },
    { id: '02-01-02', name: 'CSS' },
    { id: '02-01-03', name: 'Javascript' },
    { id: '02-01-04', name: 'React' },
    { id: '02-01-05', name: 'Vue' },
    { id: '02-01-06', name: 'TypeScript' },
    { id: '02-01-07', name: 'Elm' },
    { id: '02-01-08', name: 'JQuery' },
    { id: '02-01-09', name: 'Angular' },
    { id: '02-01-10', name: 'Swift' },
    { id: '02-02', name: 'FrameWorks' },
    { id: '02-02-01', name: 'React' },
    { id: '02-02-02', name: 'Angular' },
    { id: '02-02-03', name: 'VueJs' },
    { id: '02-02-04', name: 'JQuery' },
    { id: '02-02-05', name: 'EmberJs' },
    { id: '02-02-06', name: 'Backbone.JS' },
    { id: '02-02-07', name: 'Svelte' },
    { id: '02-02-08', name: 'Semantic UI' },
    { id: '02-02-09', name: 'Foundation' },
    { id: '02-02-10', name: 'Preact' },
    { id: '03', name: 'FullStack' },
    { id: '03-01', name: 'ProgrammingLanguages' },
    { id: '03-01-01', name: 'JavaScript' },
    { id: '03-01-02', name: 'TypeScript' },
    { id: '03-01-03', name: 'HTML' },
    { id: '03-01-04', name: 'CSS' },
    { id: '03-01-05', name: 'Python' },
    { id: '03-01-06', name: 'Java' },
    { id: '03-01-07', name: 'PHP' },
    { id: '03-01-08', name: 'Go' },
    { id: '03-01-09', name: 'C++' },
    { id: '03-01-10', name: 'C#' },
    { id: '03-01-11', name: 'SQL' },
    { id: '03-01-12', name: 'MQL' },
    { id: '03-02', name: 'FrameWorks' },
    { id: '03-02-01', name: 'Node JS and Express.js' },
    { id: '03-02-02', name: 'Django ' },
    { id: '03-02-03', name: 'Angular ' },
    { id: '03-02-04', name: 'React JS' },
    { id: '03-02-05', name: 'Spring Boot' },
    { id: '03-02-06', name: 'Graph QL' },
    { id: '03-02-07', name: 'Bootstrap' },
    { id: '03-02-08', name: 'Ruby on Rails' },
    { id: '03-02-09', name: 'Flask' },
    { id: '03-02-10', name: 'jQuery' },
    { id: '03-02-11', name: 'Android SDK' },
    { id: '03-02-12', name: 'Symfony' },
    { id: '04', name: 'Learning' },
    { id: '04-01', name: 'private lesson' },
    { id: '04-02', name: 'turn' },
    { id: '05', name: 'clouding' },
    { id: '05-01', name: 'Amazon' },
    { id: '05-02', name: 'Google' },
    { id: '06', name: 'UI/UX' },
    { id: '06-01', name: 'Web' },
    { id: '06-02', name: 'Mobile' },
    { id: '06-03', name: 'Advertisment' },
    { id: '07', name: 'AI' },
    { id: '07-01', name: 'ML' },
    { id: '07-02', name: 'DataScience' },
    { id: '07-03', name: 'NuralNetwork' },
    { id: '08', name: 'DataEntry' },
    { id: '08-01', name: 'Word' },
    { id: '08-02', name: 'Excel' },
    { id: '08-03', name: 'DataBase' },
  ]

  constructor() {
    this.treeviewData = [
      {
        id: '01', name: 'BackEnd',
        subChild: [
          {
            id: '01-01', name: 'ProgrammingLanguages',
            subChild: [
              { id: '01-01-01', name: 'Javascript' },
              { id: '01-01-02', name: 'PHP' },
              { id: '01-01-03', name: 'Ruby' },
              { id: '01-01-04', name: 'Python' },
              { id: '01-01-05', name: 'Java' },
              { id: '01-01-06', name: 'Rust' },
              { id: '01-01-07', name: 'Solidity' },
              { id: '01-01-08', name: 'Go' },
              { id: '01-01-09', name: 'Kotlin' },
              { id: '01-01-10', name: 'Node JS' }
            ]
          },
          {
            id: '01-02', name: 'FrameWorks',
            subChild: [
              { id: '01-02-01', name: 'Django' },
              { id: '01-02-02', name: 'ExpressJS' },
              { id: '01-02-03', name: 'Laravel' },
              { id: '01-02-04', name: 'Ruby on Rails' },
              { id: '01-02-05', name: 'CakePHP' },
              { id: '01-02-06', name: 'Flask' },
              { id: '01-02-07', name: 'Asp .NET' },
              { id: '01-02-08', name: 'Spring Boot' },
              { id: '01-02-09', name: 'Koa' },
              { id: '01-02-10', name: 'Phoenix' }
            ]
          }
        ]
      },
      {
        id: '02', name: 'FrontEnd',
        subChild: [
          {
            id: '02-01', name: 'ProgrammingLanguages',
            subChild: [
              { id: '02-01-01', name: 'HTML' },
              { id: '02-01-02', name: 'CSS' },
              { id: '02-01-03', name: 'Javascript' },
              { id: '02-01-04', name: 'React' },
              { id: '02-01-05', name: 'Vue' },
              { id: '02-01-06', name: 'TypeScript' },
              { id: '02-01-07', name: 'Elm' },
              { id: '02-01-08', name: 'JQuery' },
              { id: '02-01-09', name: 'Angular' },
              { id: '02-01-10', name: 'Swift' }
            ]
          },
          {
            id: '02-02', name: 'FrameWorks',
            subChild: [
              { id: '02-02-01', name: 'React' },
              { id: '02-02-02', name: 'Angular' },
              { id: '02-02-03', name: 'VueJs' },
              { id: '02-02-04', name: 'JQuery' },
              { id: '02-02-05', name: 'EmberJs' },
              { id: '02-02-06', name: 'Backbone.JS' },
              { id: '02-02-07', name: 'Svelte' },
              { id: '02-02-08', name: 'Semantic UI' },
              { id: '02-02-09', name: 'Foundation' },
              { id: '02-02-10', name: 'Preact' }
            ]
          }
        ]

      },
      {
        id: '03', name: 'FullStack',
        subChild: [
          {
            id: '03-01', name: 'ProgrammingLanguages',
            subChild: [
              { id: '03-01-01', name: 'JavaScript' },
              { id: '03-01-02', name: 'TypeScript' },
              { id: '03-01-03', name: 'HTML' },
              { id: '03-01-04', name: 'CSS' },
              { id: '03-01-05', name: 'Python' },
              { id: '03-01-06', name: 'Java' },
              { id: '03-01-07', name: 'PHP' },
              { id: '03-01-08', name: 'Go' },
              { id: '03-01-09', name: 'C++' },
              { id: '03-01-10', name: 'C#' },
              { id: '03-01-11', name: 'SQL' },
              { id: '03-01-12', name: 'MQL' }
            ]
          },
          {
            id: '03-02', name: 'FrameWorks',
            subChild: [
              { id: '03-02-01', name: 'Node JS and Express.js' },
              { id: '03-02-02', name: 'Django ' },
              { id: '03-02-03', name: 'Angular ' },
              { id: '03-02-04', name: 'React JS' },
              { id: '03-02-05', name: 'Spring Boot' },
              { id: '03-02-06', name: 'Graph QL' },
              { id: '03-02-07', name: 'Bootstrap' },
              { id: '03-02-08', name: 'Ruby on Rails' },
              { id: '03-02-09', name: 'Flask' },
              { id: '03-02-10', name: 'jQuery' },
              { id: '03-02-11', name: 'Android SDK' },
              { id: '03-02-12', name: 'Symfony' }
            ]
          }
        ]
      },
      {
        id: '04', name: 'Learning',
        subChild: [
          { id: '04-01', name: 'private lesson' },
          { id: '04-02', name: 'turn' }
        ]
      },
      {
        id: '05', name: 'clouding',
        subChild: [
          { id: '05-01', name: 'Amazon' },
          { id: '05-02', name: 'Google' }
        ]
      },
      {
        id: '06', name: 'UI/UX',
        subChild: [
          { id: '06-01', name: 'Web' },
          { id: '06-02', name: 'Mobile' },
          { id: '06-03', name: 'Advertisment' }
        ]
      },
      {
        id: '07', name: 'AI',
        subChild: [
          { id: '07-01', name: 'ML' },
          { id: '07-02', name: 'DataScience' },
          { id: '07-03', name: 'NuralNetwork' }
        ]
      },
      {
        id: '08', name: 'DataEntry',
        subChild: [
          { id: '08-01', name: 'Word' },
          { id: '08-02', name: 'Excel' },
          { id: '08-03', name: 'DataBase' }
        ]
      }
    ]
    this.datasourceFields = {
      dataSource: this.treeviewData, value: 'id', text: 'name', child: 'subChild'
    }
  }
  getALLSkill(): Object[] {
    return this.treeviewData
  }
  getALLskill(): Object {
    return this.datasourceFields
  }
  getSkill():Object[]{
   return this.data
  }
}
