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
    const interval: any = window.setInterval(() => {
      if (this.count === this.data[iteration].length) {
        return window.clearInterval(interval);
      }
      data = [];
      this.count++
      this.formatData(this.data[iteration][this.count]);
    }, 350)
    window.setTimeout(() => {
      this.visible = false;
    }, 9000)
  }

  formatData(data: string) {
    const value = data;
    if (this.count === 1) this.indent++
    if (value.slice(0, 3) === 'for' || value.slice(0, 3) === 'if ' && this.count !== 1) {
      this.indent++
      this.formattedData.push({ indent: this.indent, data: data })
      return
    }
    if (value.slice(data.length - 1, data.length) === '}') {
      this.indent--;
      this.formattedData.push({ indent: this.indent, data: data })
      return
    }
    this.formattedData.push({ indent: this.indent, data: data })
  }
}
