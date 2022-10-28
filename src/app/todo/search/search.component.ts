import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms'
//@ts-ignore
import list from '../constants/lists.json' assert {type: 'json'}
import { Rows } from '../services/linked-list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public inputForm = this.formBuilder.group({ search: '' });
  public results: string[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.inputForm.value.search) return;
    //@ts-ignore
  }

  @Output() addItem = new EventEmitter<Rows>()

  handleClick() {
    this.inputForm.value.search = '';
    this.results = [];
    const row = new Rows('', '', new Date(), [], 0, 0);
    this.addItem.emit(row);
  }

  handleChange() {

    const target = this.inputForm.value.search;
    let array: string[] = [];
    if (!target) return;

    this.results = [];

    for (let i = 0; i < list.length; i++) {
      array[i] = list[i].activity;
      if (target.length === 1 && array[i][0].toLowerCase() === target[0].toLowerCase()) this.results[0] = list[i].activity.toLowerCase()
    }

    console.log(this.results);
    if (target.length === 1) {
      //binarySearch maybe lol

    }
  }


}
