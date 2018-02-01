import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  constructor() { }
}

export interface IMenuItem{
  text:string,icon:string,route:string,state?:string
}
