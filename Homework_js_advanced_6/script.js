function Academy(name, students, subjects, dateStart, dateEnd) {
    this.name = name;
    this.students = students;
    this.subjects = subjects;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.numberOfClasses = this.subjects.length * 10;
    this.printStudents = () =>
        this.students.forEach(student => console.log(`Name: ${student.firstName}, Last Name: ${student.lastName}`));
    this.printSubjects = () =>
        this.subjects.forEach(subject => console.log(`Title: ${subject.title}, Number of Clases: ${subject.numberOfClasses}, Is Elective: ${subject.isElective}`));
}

function Subject(title, isElective, academy, students) {
    this.title = title;
    this.numberOfClasses = 10;
    this.isElective = isElective;
    this.academy = academy;
    this.students = students;
    this.overrideClasses = (numberOfClasses) => numberOfClasses >= 3 ? this.numberOfClasses = numberOfClasses : console.log("Number of clasees can't be smaller than 3");
}

function Student(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.completedSubjects = [];
    this.academy = null;
    this.currentSubject = null;
    this.startAcademy = function (academy) {
        this.academy = academy;
        this.academy.students.push(this);
    };
    this.startSubject = (subject) => {
        if (this.academy !== null) {
            if (this.currentSubject !== null) {
                this.completedSubjects.push(this.currentSubject);
            }

            this.currentSubject = subject;
            this.currentSubject.students.push(this);

        } else {
            console.error("Can not start subject while academy is not set");
        }

    }
}

let students = []
for (let i = 1; i <= 10; i++) {
    students.push(new Student(`Ime${i}`, `Prezime${i}`, 20 + i));
}

let subjects = [];
for (let i = 1; i <= 10; i++) {
    subjects.push(new Subject(`Subject ${i}`, i % 2 === 0, null, []));
}

let academyForProgramming = new Academy(
    "Web Development Programming",
    [],
    subjects,
    new Date(2023, 8, 1),
    new Date(2024, 8, 1)
);

subjects.map(subject => Object.assign(subject, { academy: academyForProgramming }))

students.map(student => {
    student.startAcademy(academyForProgramming);
    student.startSubject(subjects[0]);
    student.startSubject(subjects[1]);
})

console.log(academyForProgramming);

