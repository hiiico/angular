abstract class Employee {
    public name: string;
    public age: number;
    public salary: number;
    public tasks: Array<string>;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    work(): void {
        const currentTask = this.tasks.shift();
        this.tasks.push(currentTask!);
    }

    collectSalary(): void {
        console.log(`${this.name} received ${this.getSalary} this month.`);
    }

    getSalary(): number {
        return this.salary;
    }
}

export class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('is working on a simple task.');
    }
}

export class Senior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push('is working on a complicated task.');
        this.tasks.push('is taking time off work.');
        this.tasks.push('is supervising junior workers.');
    }
}

export class Manager extends Employee {
    public dividend: number;

    constructor(name: string, age: number) {
        super(name, age);
        this.dividend = 0;
        this.tasks.push('scheduled a meeting.');
        this.tasks.push('is preparing a quarterly report.');
    }

    getSalary(): number {
        return this.salary + this.dividend;
    }
}

const junior = new Junior('Pesho', 25);
junior.salary = 1000;
junior.work();
junior.collectSalary();

const senior = new Senior('Gosho', 31);
senior.salary = 1500;
senior.work();
senior.collectSalary();

const manager = new Manager('Stamat', 40);
manager.salary = 2000;
manager.dividend = 500;
manager.work();
manager.collectSalary();

console.log(junior);
console.log(senior);
console.log(manager);

