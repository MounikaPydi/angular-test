import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() perPage: any;
  @Input() totalRecords: any;
  @Input() pageNumber: any;
  @Output() getPageNumber = new EventEmitter<any>();
  currentPage: number = 1;
  numOfPages: any;
  Arr = Array;
  constructor() { }

  ngOnInit(): void {
    this.currentPage = this.pageNumber;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.numOfPages = Math.ceil(this.totalRecords/this.perPage);
    this.currentPage = this.pageNumber;
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getPageNumber.emit(this.currentPage);
  }

  onPrevClick() {
    this.currentPage = this.currentPage - 1;
    this.getPageNumber.emit(this.currentPage);
  }

  onNextClick() {
    this.currentPage = this.currentPage + 1
    this.getPageNumber.emit(this.currentPage);
  }
}
