abstract class Melon {
    public weight: number;
    public melonSort: string;
    protected elementIndex: number;

    constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = weight * melonSort.length;
    }

    get elementIndexValue(): number {
        return this.elementIndex;
    }

    toString(): string {
        let element: string;
        const className = (this.constructor as { name: string }).name;

        if (className === 'Watermelon') {
            element = "Water";
        } else if (className === 'Firemelon') {
            element = "Fire";
        } else if (className === 'Earthmelon') {
            element = "Earth";
        } else if (className === 'Airmelon') {
            element = "Air";
        } else if (className === 'Melolemonmelon') {
            element = "";
        } else {
            element = "Throws error";
        }

        return `Element: ${element}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex}`;
    }
}

export class Watermelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }
}

export class Firemelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }
}

export class Earthmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }
}

export class Airmelon extends Melon {
    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
    }
}

export class Melolemonmelon extends Watermelon { // inherits any of the four
    private currentElement: string;
    private static readonly elementCycle = ["Water", "Fire", "Earth", "Air"];

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.currentElement = "Water";
    }

    morph(): void {
        const currentIndex = Melolemonmelon.elementCycle.indexOf(this.currentElement);
        const nextIndex = (currentIndex + 1) % Melolemonmelon.elementCycle.length;
        this.currentElement = Melolemonmelon.elementCycle[nextIndex];
    }

    toString(): string {
        return `Element: ${this.currentElement}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex}`;
    }
}

let melolemonmelon: Melolemonmelon = new Melolemonmelon(12.5, "Kingsize");
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());