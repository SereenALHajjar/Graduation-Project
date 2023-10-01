import { Injectable } from '@angular/core';
import { TreeNode } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ListskillService {
 private nodes: TreeNode[] = [];
//  private selected: any[] = [];
private selected: any;
private data = [
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

  constructor() {
    this.nodes=[
      {
        key: '01', label: 'BackEnd',
        children: [
          {
            key: '01-01', label: 'ProgrammingLanguages',
            children: [
              { key: '01-01-01', label: 'Javascript' },
              { key: '01-01-02', label: 'PHP' },
              { key: '01-01-03', label: 'Ruby' },
              { key: '01-01-04', label: 'Python' },
              { key: '01-01-05', label: 'Java' },
              { key: '01-01-06', label: 'Rust' },
              { key: '01-01-07', label: 'Solidity' },
              { key: '01-01-08', label: 'Go' },
              { key: '01-01-09', label: 'Kotlin' },
              { key: '01-01-10', label: 'Node JS' }
            ]
          },
          {
            key: '01-02', label: 'FrameWorks',
            children: [
              { key: '01-02-01', label: 'Django' },
              { key: '01-02-02', label: 'ExpressJS' },
              { key: '01-02-03', label: 'Laravel' },
              { key: '01-02-04', label: 'Ruby on Rails' },
              { key: '01-02-05', label: 'CakePHP' },
              { key: '01-02-06', label: 'Flask' },
              { key: '01-02-07', label: 'Asp .NET' },
              { key: '01-02-08', label: 'Spring Boot' },
              { key: '01-02-09', label: 'Koa' },
              { key: '01-02-10', label: 'Phoenix' }
            ]
          }
        ]
      },
      {
        key: '02', label: 'FrontEnd',
        children: [
          {
            key: '02-01', label: 'ProgrammingLanguages',
            children: [
              { key: '02-01-01', label: 'HTML' },
              { key: '02-01-02', label: 'CSS' },
              { key: '02-01-03', label: 'Javascript' },
              { key: '02-01-04', label: 'React' },
              { key: '02-01-05', label: 'Vue' },
              { key: '02-01-06', label: 'TypeScript' },
              { key: '02-01-07', label: 'Elm' },
              { key: '02-01-08', label: 'JQuery' },
              { key: '02-01-09', label: 'Angular' },
              { key: '02-01-10', label: 'Swift' }
            ]
          },
          {
            key: '02-02', label: 'FrameWorks',
            children: [
              { key: '02-02-01', label: 'React' },
              { key: '02-02-02', label: 'Angular' },
              { key: '02-02-03', label: 'VueJs' },
              { key: '02-02-04', label: 'JQuery' },
              { key: '02-02-05', label: 'EmberJs' },
              { key: '02-02-06', label: 'Backbone.JS' },
              { key: '02-02-07', label: 'Svelte' },
              { key: '02-02-08', label: 'Semantic UI' },
              { key: '02-02-09', label: 'Foundation' },
              { key: '02-02-10', label: 'Preact' }
            ]
          }
        ]

      },
      {
        key: '03', label: 'FullStack',
        children: [
          {
            key: '03-01', label: 'ProgrammingLanguages',
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
              { key: '03-01-12', label: 'MQL' }
            ]
          },
          {
            key: '03-02', label: 'FrameWorks',
            children: [
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
          }
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
    this.selected= {
      dataSource: this.nodes, value: 'key', text: 'label', child: 'childern'
    }
   }
   getALLSkill(): TreeNode[] {
    return this.nodes
  }
  getALLskill(): Object {
    return this.selected
  }
  getSkill():TreeNode[]{
   return this.data
  }
}
