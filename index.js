"use strict";

function Student (firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.notesList = [];
    this.attendanceRecords = Array(Student.ATTENDANCE_MAX_RECORDS).fill(null); 
    this.attendanceCount = 0; 
}

// Limit for 'attendanceRecords'
Student.ATTENDANCE_MAX_RECORDS = 25;

Student.prototype.getAge = function() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
}

Student.prototype.getAverageNote = function() {
    if (this.notesList.length === 0) {
        return 0;
    }

    let sum = 0;
    for(let i = 0; i < this.notesList.length; i++) {
        sum += this.notesList[i];
    }
    return sum / this.notesList.length;
}

Student.prototype.present = function() {
    if (this.attendanceCount < Student.ATTENDANCE_MAX_RECORDS) {
        this.attendanceRecords[this.attendanceCount] = true;
        this.attendanceCount++;
    } 
};

Student.prototype.absent = function() {
    if (this.attendanceCount < Student.ATTENDANCE_MAX_RECORDS) {
        this.attendanceRecords[this.attendanceCount] = false;
        this.attendanceCount++;
    }
};

Student.prototype.getAverageAttendance = function() {
    if (this.attendanceCount === 0) {
        return 0;
    }
    const validAttendanceRecords = this.attendanceRecords.slice(0, this.attendanceCount); 
    const presentCount = validAttendanceRecords.filter(status => status === true).length;
    
    return presentCount / this.attendanceCount;
};

Student.prototype.summary = function() {
    const averageNote = this.getAverageNote();
    const averageAttendance = this.getAverageAttendance(); 

    if (averageNote > 90 && averageAttendance > 0.9) {
        return "Молодець!";
    } else if (averageNote > 90 || averageAttendance > 0.9) {
        return "Добре, але можна краще ";
    } else {
        return "Редиска!";
    }
};

// ======================================================================================================

// Examples of usage:
const student1 = new Student("Mary", "Sue", 2003);
const student2 = new Student("John", "Doe", 2005);
const student3 = new Student("Jack", "Smith", 2002);

// ------------------------------------------------------
console.log(`--- Student: ${student1.firstName} ${student1.lastName} ---`);
console.log(`Age: ${student1.getAge()} years old.`);

student1.notesList = [95, 92, 92];
console.log(`Average note: ${student1.getAverageNote().toFixed(2)}`);

// attendance
for (let i = 0; i < 23; i++) {
    student1.present();
}
for (let i = 0; i < 2; i++) {
    student1.absent();
}

console.log(`Average attendance: ${student1.getAverageAttendance().toFixed(2)}`);
console.log(`Summary for ${student1.firstName} ${student1.lastName}: ${student1.summary()}`); // "Молодець!"

// ------------------------------------------------------
console.log(`\n--- Student: ${student2.firstName} ${student2.lastName} ---`);
console.log(`Age: ${student2.getAge()} years old`);

student2.notesList = [70, 80, 75];
console.log(`Average note: ${student2.getAverageNote().toFixed(2)}`);

for (let i = 0; i < 5; i++) {
    student2.present();
}
for (let i = 0; i < 20; i++) {
    student2.absent();
}
console.log(`Average attendance: ${student2.getAverageAttendance().toFixed(2)}`);
console.log(`Summary for ${student2.firstName} ${student2.lastName}: ${student2.summary()}`); // "Редиска!"

// ------------------------------------------------------
console.log(`\n--- Student: ${student3.firstName} ${student3.lastName} ---`);
console.log(`Age: ${student3.getAge()} years old`);

student3.notesList = [90, 99, 92];
console.log(`Average note: ${student3.getAverageNote().toFixed(2)}`);

for (let i = 0; i < 15; i++) {
    student3.present();
}
for (let i = 0; i < 10; i++) {
    student3.absent();
}
console.log(`Average attendance: ${student3.getAverageAttendance().toFixed(2)}`);
console.log(`Summary for ${student3.firstName} ${student3.lastName}: ${student3.summary()}`); // "Добре, але можна краще "