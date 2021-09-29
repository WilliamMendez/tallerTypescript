import { Course } from './course';
import { dataCourses } from './dataCourses.js';

export class Student {
    name: string;
    imgSrc: string;
    code: number;
    cardId: number;
    age: number;
    address: string;
    phone:string;
    currentCourses: Course[] = dataCourses;

    constructor() {
        this.name = "William Mendez";
        this.imgSrc = "./202012662.png"
        this.code = 202012662;
        this.cardId = 1000857021;
        this.age = 19;
        this.address = "calle falsa 123";
        this.phone = "7733956";
        this.currentCourses = dataCourses;
    }
}