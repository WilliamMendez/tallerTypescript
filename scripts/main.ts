import { Course } from './course.js';
import { Student } from './student.js';

let student = new Student();
let dataCourses = student.currentCourses;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const imgAvatar: HTMLImageElement = document.getElementById("imgAvatar") as HTMLImageElement;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const min: HTMLInputElement = <HTMLInputElement> document.getElementById("min-box")!;
const max: HTMLInputElement = <HTMLInputElement> document.getElementById("max-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const name: HTMLParagraphElement = document.getElementById('LName') as HTMLParagraphElement;
const code: HTMLElement = document.getElementById('LCode') as HTMLElement;
const cardId: HTMLElement = document.getElementById('LCardId') as HTMLElement;
const age: HTMLElement = document.getElementById('LAge') as HTMLElement;
const address: HTMLElement = document.getElementById('LAddress') as HTMLElement;
const phone: HTMLElement = document.getElementById('LPhone') as HTMLElement;


renderStudentData();


btnfilterByName.onclick = () => applyFilter(Number(min.value), Number(max.value));

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentData() {
  console.log('Agregando datos');
  name.textContent = student.name;
  imgAvatar.src = student.imgSrc;
  code.textContent = student.code.toString();
  cardId.textContent = student.cardId.toString();
  age.textContent = student.age.toString() + " Años";
  address.textContent = student.address;
  phone.textContent = student.phone;
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilter(min?: number, max?: number) {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  if (max && min && max >= 0 && min >= 0) {
    console.log("Filtrando con min " + min + " y " + max +" max");
    let coursesInterval: Course[] = searchCourseByInterval(min, max, dataCourses);
    var coursesFiltered: Course[] = searchCourseByName(text, coursesInterval);
  } else {
    var coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  }
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? courses : courses.filter( c =>
    c.name.match(nameKey));
}

function searchCourseByInterval(min: number, max: number, dataCourses: Course[]): Course[] {
  let filtered: Course[] = [];
  for (let index = 0; index < dataCourses.length; index++) {
    const course = dataCourses[index];
    if (course.credits >= min && course.credits <= max) {
      filtered.push(course);
    }
  }
  console.log(filtered);
  return filtered;
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}

