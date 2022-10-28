import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
//@ts-ignore
import list from '../constants/lists.json' assert {type: 'json'}
import { Rows } from '../services/linked-list.service';

@Component({
  selector: 'app-todo-interface',
  templateUrl: './todo-interface.component.html',
  styleUrls: ['./todo-interface.component.css'],
})
export class TodoInterfaceComponent implements OnInit {

  public interface: boolean = false
  public newList = list;
  public inputModal: boolean = false;

  @Output() addItem = new EventEmitter<Rows>();
  @Output() sortList = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void { };

  toggleInputModal = () => this.inputModal = !this.inputModal
  toggleInterface = () => {
    if (!this.inputModal) this.toggleInputModal();
    this.interface = !this.interface;
  }

  sortLists = () => this.sortList.emit()

  handleClick(data: string, image: string, priority: number) {
    this.toggleInterface();
    this.addItem.emit(new Rows(data, image, new Date(), [''], priority, 0))
    for (let i = 0; i < list.length; i++) {
      if (data === list[i].activity) {
        this.newList.splice(i, 1);
      }
    }
  }
}
