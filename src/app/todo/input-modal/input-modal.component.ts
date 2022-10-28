import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit, OnChanges {

  public activity: string = '';
  public priority: number = 0;
  public inputForm = this.formBuilder.group({ activity: '', priority: '' })

  constructor(private formBuilder: FormBuilder) { }

  @Input() inputModal = false;
  @Output() toggleInterface = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.inputModal = changes['inputModal'].currentValue
  }

  onSubmit() {
    if (!this.inputForm.value.activity || !this.inputForm.value.priority) return;
    //@ts-ignore
    const row = new Rows(this.inputForm.value.activity!, '', new Date(), [''], this.inputForm.value.priority, 0);
    console.log(row)
  }

  toggleModal() {
    console.log('emmitting toggleInterface')
    this.toggleInterface.emit(this.inputModal);
  }

}
