import { Injectable } from '@angular/core';
import { Country } from '../Models/country';

@Injectable({
  providedIn: 'root'
})
export class StaticcountryService {
  private CountList:Country[];
  private CountryData:Object[];
  private DataFields:Object;

  constructor() { 

  this.CountList=[
    {id:1, name:"حمص"},
    {id:2, name:"حماة"},
    {id:3, name:"دمشق"},
    {id:1, name:"إدلب"},
    {id:5, name:"دير الزور"},
    {id:6, name:"الحسكة"},
    {id:7, name:"الرقة"},
    {id:8, name:"درعا"},
    {id:9, name:"اللاذقية"},
    {id:10, name:"طرطوس"},
    {id:11, name:"ريف دمشق"},
    {id:12, name:"القنيطرة"},
    {id:13, name:"حلب"},
    {id:14, name:"السويداء"}
  ]
  this.CountryData=[
    {id:'1', name:"حمص"},
    {id:'2', name:"حماة"},
    {id:'3', name:"دمشق"},
    {id:'1', name:"إدلب"},
    {id:'5', name:"دير الزور"},
    {id:'6', name:"الحسكة"},
    {id:'7', name:"الرقة"},
    {id:'8', name:"درعا"},
    {id:'9', name:"اللاذقية"},
    {id:'10', name:"طرطوس"},
    {id:'11', name:"ريف دمشق"},
    {id:'12', name:"القنيطرة"},
    {id:'13', name:"حلب"},
    {id:'14', name:"السويداء"} 
   ]
   this.DataFields={text:'name',value:'id'}
  }
  
   getAllCountry():Country[]
   { return this.CountList;}
  getAllContry():Object[]
  {return this.CountryData}
  getAllcountry():Object
  {return this.DataFields}
}
