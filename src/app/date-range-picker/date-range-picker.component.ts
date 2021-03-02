import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {

  @Output() startDateSelected = new EventEmitter<any>();
  @Output() endDateSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onStartDateChange(e: any) {
    // var startDate = new Date(e.target.value);
    // console.log(startDate.getFullYear());
    this.startDateSelected.emit(e.target.value);
  }

  onEndDateChange(e: any) {
    // var endDate = new Date(e.target.value);
    // console.log(endDate.getFullYear());
    this.endDateSelected.emit(e.target.value);
  }
}
