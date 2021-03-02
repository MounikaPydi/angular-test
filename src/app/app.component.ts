import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  data: any = [];
  paginatedData: any = [];
  types: String[] = [];
  directors: String[] = [];
  countries: String[] = [];
  cast: String[] = [];
  selectedTypes: String[] = [];
  selectedDirector: String = '';
  selectedCast: string[] = [];
  selectedCountry: String = '';
  selectedStartYear: any;
  selectedEndYear: any;
  perPage: number = 3;
  pageNumber: number = 1;
  selectedFile: any;

  constructor(private dataService: DataService){}

  ngOnInit() {
    this.data = [...this.dataService.data];
    this.paginatedData = this.data.slice(0,this.perPage);
    this.types = this.dataService.getTypes();
    this.directors = this.dataService.getDirectors();
    this.cast = this.dataService.getCast();
    this.countries = this.dataService.getCountries();
  }

  // onFileSelect(e: any) {  
  //   let workBook: any = null;
  //   let jsonData = null;
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   reader.onload = (event) => {
  //     const data = reader.result;
  //     workBook = XLSX.read(data, { type: 'binary' });
  //     jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
  //       const sheet = workBook.Sheets[name];
  //       initial[name] = XLSX.utils.sheet_to_json(sheet);
  //       return initial;
  //     }, {});
  //     const dataString = JSON.stringify(jsonData);
  //     this.dataService.getData(dataString);
  //   }
  //   reader.readAsBinaryString(file);
  // }

  typeSelected(type: String) {
    this.selectedTypes.push(type);
  }

  castSelected(cast: string) {
    this.selectedCast.push(cast);
  }

  typeDeselected(type: String) {
    this.selectedTypes = this.selectedTypes.filter(t => t !== type);
  }

  castDeselected(cast: String) {
    this.selectedCast = this.selectedCast.filter(t => t !== cast);
  }

  startDateSelected(startDate: any) {
    this.selectedStartYear = new Date(startDate).getFullYear();
  }

  endDateSelected(endDate: any) {
    this.selectedEndYear = new Date(endDate).getFullYear();
  }

  onPageChange(number: number) {
    this.pageNumber = number;
    this.paginatedData = this.data.slice((number - 1)*this.perPage, number*this.perPage);
  }

  removeDuplicates() {
    var length = this.data.length;
    var filteredArr
    for(var i = 0; i < length; i++) {
      filteredArr = this.data.reduce((acc: any, current: any) => {
      const x = acc.find((item:any) => item.show_id === current.show_id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  }
  console.log(filteredArr);
  this.data = [...filteredArr];
  }

  applyFilter() {
    if(this.selectedCast.length > 0 || this.selectedTypes.length > 0 || this.selectedDirector.length > 0 || this.selectedCountry.length > 0 || (typeof(this.selectedStartYear) !== 'undefined' && typeof(this.selectedEndYear) !== 'undefined')) {
      this.data = this.dataService.data.filter((show: any) => this.selectedTypes.includes(show.type) ||
                                                              (show.director.length > 0 && this.selectedDirector === show.director) ||
                                                              (show.country.length > 0 && this.selectedCountry === show.country) ||
                                                              ((typeof(this.selectedStartYear) !== 'undefined' && typeof(this.selectedEndYear) !== 'undefined') && ((this.selectedStartYear <= show.release_year) && (show.release_year <= this.selectedEndYear))))
      if(this.selectedCast.length > 0) {
        var i: number;
        var castData: any = [];
        var length = this.selectedCast.length;
        for(i=0; i < length; i++) {
          castData = this.dataService.data.filter(show => show.cast.includes(this.selectedCast[i]));        
          this.data = [...this.data, ...castData];
        }
        this.removeDuplicates();
      }
      this.onPageChange(1);
      this.pageNumber = 1;
    } else {
      this.data = [...this.dataService.data];
      this.onPageChange(1);
      this.pageNumber = 1;
    }
  }

  resetFilter() {
    this.data = [...this.dataService.data];
    this.onPageChange(1);
    this.pageNumber = 1;
    this.selectedTypes = [];
    this.selectedDirector = '';
    this.selectedCast = [];
    this.selectedCountry = '';
  }
}
