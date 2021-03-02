import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-show',
  templateUrl: './display-show.component.html',
  styleUrls: ['./display-show.component.css']
})
export class DisplayShowComponent implements OnInit {

  @Input() show: any;
  cast: String[] = [];
  directors: String[] = [];
  constructor() { }

  ngOnInit(): void {
    this.cast = this.show.cast.split(",");
    this.directors = this.show.director.split(",");
  }

}
