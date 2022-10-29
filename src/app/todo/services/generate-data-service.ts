import { Injectable } from "@angular/core";
import { Rows } from "./linked-list.service";

@Injectable({
    providedIn: 'root'
})
export default class GenerateTestData {

    public list: Rows[] = [];

    constructor() { }

    generateData() {
        for (let i = 0; i < 20; i++) {
            let index = Math.round(Math.random() * activities.length - 2);
            if (index < 0) index = 1;
            this.list[i] = new Rows(activities[index], 'https://raw.githubusercontent.com/twbs/icons/9a2d13acc39ca084c981f0cd3f80d270af34bd49/icons/egg-fried.svg', new Date(), [], Math.round(Math.random() * 6), 0);
        }
        return this.list;
    }
}

const activities = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'g',
    'f',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
]