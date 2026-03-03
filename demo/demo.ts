

// class
class Greeter {
    public greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(): string {
        return `Hello, ${this.greeting}`;
    }

}

let greeter: Greeter = new Greeter("world!");
console.log(greeter.greet());

// inheritance
class Animal {
    move(distanceInMeters: number = 0): void {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
class Dog extends Animal {
    bark(): void {
        console.log('Woof! Woof!');
    }
}
const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// without interface
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// with interface
interface LabelledValue {
    label: string;
}

function printLabel1(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);

// generics
function identity<T>(arg: T): T {
    return arg;
}
// output -> string
let output = identity<string>("myString");
console.log(output);
// output -> number
let output1 = identity(5);
console.log(output1);
// enums
enum Direction {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4,
}
let dir: Direction = Direction.Up;
console.log(dir);

// importing a class from another file
import KeyValuePair from "../01-lab/06.key-value";
// export a class from another 06.key-value.ts file
export default KeyValuePair;