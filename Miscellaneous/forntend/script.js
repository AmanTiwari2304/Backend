// function personMaker( name , age)  {
//     const person = {
//         name : name,
//         age : age,
//         talk() {
//             console.log(`Hi, my name is ${this.name}`);
//         }
//     };
//     return person;
// };


//Constructor - Doesn't return anything & start with Capital
// function Person( name , age)  {
//     this.name = name,
//     this.age = age
// };

// Person.prototype.talk = function () {
//     console.log(`Hi , my name is ${this.name}`);
// };

// let p1 = new Person("Ayush",17);
// let p2 = new Person("Krishna",18);


//Classes in JS :-

// class Person {
//     constructor (name,age) {
//         this.name = name,
//         this.age = age;
//     }
//     talk() {
//         console.log(`Hi, my name is ${this.name}`)
//     }
// }

// let p1 = new Person("Ayush",17);
// let p2 = new Person("Krishna",18);


// Inheritance :-

class Person {
    constructor (name,age) {
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log(`Hi, I am ${this.name}`);
    }
}

class Student extends Person {
    constructor (name ,age, marks) {
        super(name,age);
        this.marks = marks;
    }
}

class Teacher extends  Person {
    constructor (name, age, subject) {
        super(name,age);
        this.subject = subject;
    }
}