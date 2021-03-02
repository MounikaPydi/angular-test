import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() list: any;
  @Input() selectedList: any;
  @Output() onSelect = new EventEmitter<any>();
  @Output() onDeselect = new EventEmitter<any>();
  @Input() hasSearch: any = false;
  items: any = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [...this.list];
  }

  onChange(e: any, item: String) {
    if(e.target.checked) {
      this.onSelect.emit(item);
    } else {
      this.onDeselect.emit(item);
    }
  }

  onSearch(e: any) {
    const searchString = e.target.value;
    if (e.target.value.length > 0) {
      this.items = this.list.filter((item: string) => item.toLowerCase().includes(searchString.toLowerCase()));
    } else {
      this.items = [...this.list];
    }
  }

}
