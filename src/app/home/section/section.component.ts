import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() reverse: boolean = false;
  @Input() title: string = '';
  @Input() subHeadings?: string[] = [''];
  @Input() description?: string = '';
  @Input() button?: string[] = [''];
  @Input() sectionStyle?: string = '';
}
