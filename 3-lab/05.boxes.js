// generic class
var Boxes = /** @class */ (function () {
    function Boxes() {
        this._boxes = [];
    }
    Boxes.prototype.add = function (element) {
        this._boxes.push(element);
    };
    Boxes.prototype.remove = function () {
        return this._boxes.pop();
    };
    Object.defineProperty(Boxes.prototype, "count", {
        get: function () {
            return this._boxes.length;
        },
        enumerable: false,
        configurable: true
    });
    return Boxes;
}());
// let box = new Boxes<Number>();
// box.add(1);
// box.add(2);
// box.add(3);
var box = new Boxes();
box.add("Pesho");
box.add("Gosho");
console.log('Initial count: ' + box.count);
console.log('Removed item: ' + box.remove());
console.log('Remaining count: ' + box.count);
