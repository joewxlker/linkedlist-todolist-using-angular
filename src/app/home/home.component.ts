import { Component, OnInit, OnDestroy } from '@angular/core';
import { SectionComponent } from './section/section.component';
//@ts-ignore
import data from './constants/code.json' assert {type: 'json'}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SectionComponent,]
})
export class HomeComponent implements OnInit {

  public count: number = 0;
  public visible: boolean = false;
  public loopCounter: number = 0;
  public mapIterator: string[] = [];
  public formattedData: Array<{ indent: number, data: string }> = [];
  public indent: number = 0;
  public data: string[][] = data;
  constructor() { }

  ngOnInit(): void {
    this.iterateData(Math.floor(Math.random() * 1));
  }

  loopInterval = window.setInterval(() => {
    if (this.loopCounter < this.data.length - 1) this.loopCounter++
    else this.loopCounter = 0;
    this.count = 0;
    this.iterateData(this.loopCounter);
  }, 10000);

  ngOnDestroy() {
    window.clearInterval(this.loopInterval)
  }

  iterateData(iteration: number) {
    this.visible = true;
    this.formattedData = [];
    this.indent = 0;
    let data: string[] = [];
    let limit = this.data[iteration][this.count].length
    let count = 0;
    const interval: any = setInterval(() => {
      if (this.count === this.data[iteration].length) return clearInterval(interval);
      if (count === limit) {
        data = [];
        count = 0;
        this.count++
        limit = this.data[iteration][this.count].length
      }
      data.push(this.data[iteration][this.count][count]);
      if (data.length === this.data[iteration][this.count].length) this.formatData(data);
      count++
    })
    window.setTimeout(() => {
      this.visible = false;
    }, 9000)
  }

  formatData(data: string[]) {
    const value = data.join('');
    if (this.count === 1) this.indent++
    if (value.slice(0, 3) === 'for' || value.slice(0, 3) === 'if ' && this.count !== 1) {
      this.indent++
      this.formattedData.push({ indent: this.indent, data: data.join('') })
      return
    }
    if (value.slice(data.length - 1, data.length) === '}') {
      this.indent--;
      this.formattedData.push({ indent: this.indent, data: data.join('') })
      return
    }
    this.formattedData.push({ indent: this.indent, data: data.join('') })
  }
}
