import { Injectable, ɵɵsetComponentScope } from '@angular/core';
//@ts-ignore
import alpha from '../constants/Alphabet.json' assert {type: 'json'}
import { SortedState } from '../todo.component';

@Injectable({
  providedIn: 'root'
})
export class LinkedListService {

  public length: number = 0;
  public head: Node | null = null
  public tail: Node | null = null
  public emptyList: boolean = true;
  public table: Rows[] = [];
  public smallestLetter: null | number = null;
  public biggestLetter: null | number = null;
  readonly maxPriority: number = 6;

  constructor() { }

  removeIndex(value: string, priority: number): Rows[] {
    this.length--
    if (this.length === 0) this.emptyList = true;
    else if (!this.tail || !this.head || !this.head.value) return this.table;
    else if (!this.tail.value) return this.table
    else if (this.head.value.activity === value && this.head.value.priority === priority) this.removeHeadNode();
    else if (this.tail.value.activity === value && this.tail.value.priority === priority) this.removeTailNode();
    else {
      let current = this.head;
      for (let i = 0; i < this.length; i++) {
        if (!current.next || !current.next.value) { throw new Error('value is undefined') };
        if (current.next.value.activity === value && current.next.value.priority === priority || current.next === null) { break; }
        current = current.next
      }
      if (!current.next) this.removeTailNode();
      else current.next = current.next.next
    }
    this.mapLinkedData();
    return this.table;
  }

  removeHeadNode(): void {
    if (!this.head) return;
    this.head = this.head!.next;
    if (this.length === 0) this.emptyList = true;
    this.mapLinkedData();
  }

  removeTailNode(): void {
    if (!this.tail || !this.head) return;
    let curr = this.head;
    for (let i = 0; i < this.length - 1; i++) {
      if (curr.next === this.tail) { break; };
      curr = curr.next!
    }
    this.tail = curr;
    this.tail.next = null;
    this.mapLinkedData();
    if (this.length === 0) this.emptyList = true;
  }

  insertHeadsTails(node: Node, tail?: boolean): void {
    if (this.isHeadTailsNull(node)) return;
    if (!tail) {
      node.next = this.head;
      this.head = node;
      return;
    }
    this.tail!.next = node;
    this.tail = node;
    return;
  }

  insertOrderedList(node: Node, state: SortedState): void {

    if (!node || !node.value) return;
    if (node.value?.priority! > this.maxPriority) return;
    if (this.isHeadTailsNull(node)) return;

    let currentNode = this.head;
    let previousNode = null;

    for (let i = 0; i < this.length; i++) {
      if (!currentNode || !currentNode.value) return;
      if (state === SortedState.ALPHABET && alpha[node.value.activity[0].toLowerCase()] < alpha[currentNode.value.activity[0].toLowerCase()]) { break; }
      if (state === SortedState.NUMERICAL && node.value.priority > currentNode.value.priority) { break; }
      if (currentNode.next === null) return this.insertHeadsTails(node, true);
      previousNode = currentNode
      currentNode = currentNode.next
    }

    if (!previousNode) return this.insertHeadsTails(node);
    previousNode.next = node
    node.next = currentNode
    return;
  }

  clearList() {
    this.length = 0;
    this.head = this.tail = null;
    this.mapLinkedData();
  }

  insert(newRow: Rows, state: SortedState): Rows[] {
    this.length++;
    const newNode = { value: newRow, next: null };
    if (state === SortedState.NUMERICAL) {
      if (newRow.priority === 1) this.insertHeadsTails(newNode, true)
      if (newRow.priority === this.maxPriority) this.insertHeadsTails(newNode)
      else this.insertOrderedList(newNode, state);
    }
    if (state === SortedState.ALPHABET) {
      if (!this.smallestLetter || this.smallestLetter < alpha[newNode.value.activity[0].toLowerCase()]) this.smallestLetter = alpha[newNode.value.activity[0].toLowerCase()];
      if (!this.biggestLetter || this.biggestLetter > alpha[newNode.value.activity[0].toLowerCase()]) this.biggestLetter = alpha[newNode.value.activity[0].toLowerCase()];
      if (alpha[newNode.value.activity[0].toLowerCase()] === this.smallestLetter) this.insertHeadsTails(newNode, true);
      if (alpha[newNode.value.activity[0].toLowerCase()] === this.biggestLetter) this.insertHeadsTails(newNode);
      else this.insertOrderedList(newNode, state);
    }
    this.mapLinkedData();
    return this.table
  }

  mapLinkedData() {
    if (!this.tail || !this.head) return this.table = [];
    let current = this.head;
    let data: Rows[] = [];
    for (let i = 0; i < this.length; i++) {
      if (current.next === null) { break; }
      data[i] = current.value!;
      current = current.next
    }
    data[this.length - 1] = current.value!;
    this.table = data;
    return data;
  }

  editComments(target: string, value: string) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (!current || !current.next || !current.next.value) { throw new Error('value is undefined') };
      if (current.next.value.activity === target || current.next === null) { current.value!.comments[0] = value }
      current = current.next
    }
  }

  private isHeadTailsNull(node: Node): boolean {
    if (!this.tail || !this.head) {
      this.tail = node;
      this.head = node
      this.mapLinkedData();
      return true
    }
    return false
  }
}

export class Node {
  public value: Rows | null = null;
  public next: Node | null = null;
  constructor(row: Rows) {
    this.value = row;
    this.next = null;
  }
}

export class Rows {
  public image: string = '';
  public activity: string = '';
  public date: Date | null = null;
  public comments: string[] = [];
  public priority: number = 0;
  public index: number = 0;
  constructor(activity: string, image: string, data: Date, comments: string[], priority: number, index: number,) {
    this.image = image;
    this.activity = activity;
    this.date = data;
    this.comments = comments;
    this.priority = priority;
    this.index = index;
  }
}