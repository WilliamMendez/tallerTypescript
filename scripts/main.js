import { Student } from './student.js';
var student = new Student();
var dataCourses = student.currentCourses;
var coursesTbody = document.getElementById('courses');
var imgAvatar = document.getElementById("imgAvatar");
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var min = document.getElementById("min-box");
var max = document.getElementById("max-box");
var totalCreditElm = document.getElementById("total-credits");
var name = document.getElementById('LName');
var code = document.getElementById('LCode');
var cardId = document.getElementById('LCardId');
var age = document.getElementById('LAge');
var address = document.getElementById('LAddress');
var phone = document.getElementById('LPhone');
renderStudentData();
btnfilterByName.onclick = function () { return applyFilter(Number(min.value), Number(max.value)); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
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
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilter(min, max) {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    if (max && min && max >= 0 && min >= 0) {
        console.log("Filtrando con min " + min + " y " + max + " max");
        var coursesInterval = searchCourseByInterval(min, max, dataCourses);
        var coursesFiltered = searchCourseByName(text, coursesInterval);
    }
    else {
        var coursesFiltered = searchCourseByName(text, dataCourses);
    }
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? courses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByInterval(min, max, dataCourses) {
    var filtered = [];
    for (var index = 0; index < dataCourses.length; index++) {
        var course = dataCourses[index];
        if (course.credits >= min && course.credits <= max) {
            filtered.push(course);
        }
    }
    console.log(filtered);
    return filtered;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
