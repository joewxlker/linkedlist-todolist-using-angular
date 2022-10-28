import { Component, OnInit } from '@angular/core';
import { LinkedListService, Rows } from './services/linked-list.service';
import GenerateTestData from './services/generate-data-service';

export enum SortedState { ALPHABET, NUMERICAL }
export enum ListEmpty { EMPTY, NOTEMPTY }

@Component({
  selector: 'app-todo',
  templateUrl: `./todo.component.html`,
  styleUrls: ['./todo.component.css'],
  providers: []
})
export class TodoComponent implements OnInit {

  public list: string[] = [];
  public sortedState: SortedState = SortedState.NUMERICAL;
  public bool: boolean = length === 0;
  public emptyList: any = ListEmpty['1'];
  public table: Rows[] = this.listService.table;
  public testData: Rows[] = [];
  public length: number = this.listService.length;
  public loading: boolean = false;
  public benchmark: number = 0;
  public action: string = '';

  constructor(private listService: LinkedListService, private generateTests: GenerateTestData) { }

  ngOnInit(): void {
    this.action = 'Loaded'
    let start = performance.now();
    this.testData = this.generateTests.generateData();
    for (let i = 0; i < this.testData.length; i++) {
      this.insert(this.testData[i])
    }
    this.length = this.listService.length;
    this.benchmark = performance.now() - start;
  }

  insert(row: Rows) {
    this.listService.insert(row, this.sortedState);
    this.setListState()
  }

  removeIndex(activity: string, priority: number) {
    this.listService.removeIndex(activity, priority);
    this.setListState()
  }

  reorderList(): void {
    this.action = 'Sorted'
    let start = performance.now();
    const array = this.table;
    if (this.sortedState === SortedState.ALPHABET) this.sortedState = SortedState.NUMERICAL
    else this.sortedState = SortedState.ALPHABET
    this.listService.clearList();
    for (let i = 0; i < array.length; i++) {
      this.insert(array[i])
    }
    this.setListState()
    this.benchmark = performance.now() - start;
    return;
  }

  private setListState() {
    this.table = this.listService.table;
    if (this.listService.length === 0) this.emptyList = ListEmpty['1'];
    else this.emptyList = ListEmpty['0'];
    this.length = this.listService.length;
  }

}
