import { Injectable } from '@angular/core';
import { showData } from './data';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = showData;
  
  constructor() { }
  

  getTypes() {
    var types = this.data.map(show => show.type);
    types = types.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) == index;
    });
    return types;
  }

  getDirectors() {
    var directors = this.data.map((show:any) => show.director);
    directors = directors.filter( function( item: String, index: number, inputArray: any ) {
      return item.length > 0 && inputArray.indexOf(item) == index;
    });
    return directors;
  }

  getCast() {
    var cast:any = [];
    this.data.map(show => {
      cast = [...cast, ...show.cast.split(",")];
    })
    cast = cast.filter( function( item: String, index: number, inputArray: any ) {
      return item.length > 0 && inputArray.indexOf(item) == index;
    });
    return cast;
  }

  getCountries() {
    var countries = this.data.map((show: any) => show.country);
    countries = countries.filter( function( item: String, index: number, inputArray: any ) {
      return item.length > 0 && inputArray.indexOf(item) == index;
    });
    return countries;
  }
}
