// generic class
class Boxes<T> {
    private _boxes: T[] = [];

    public add(element: T): void{
        this._boxes.push(element);
    }

    public remove(): T | undefined {
        return this._boxes.pop();
    }

    get count(): number {
        return this._boxes.length;
    }
}

// let box = new Boxes<Number>();
// box.add(1);
// box.add(2);
// box.add(3);

let box = new Boxes<string>();
box.add("Pesho");
box.add("Gosho");
console.log('Initial count: ' + box.count);
console.log('Removed item: ' + box.remove());

console.log('Remaining count: ' + box.count);