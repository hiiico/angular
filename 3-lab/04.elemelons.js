"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Melolemonmelon = exports.Airmelon = exports.Earthmelon = exports.Firemelon = exports.Watermelon = void 0;
var Melon = /** @class */ (function () {
    function Melon(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = weight * melonSort.length;
    }
    Object.defineProperty(Melon.prototype, "elementIndexValue", {
        get: function () {
            return this.elementIndex;
        },
        enumerable: false,
        configurable: true
    });
    Melon.prototype.toString = function () {
        var element;
        var className = this.constructor.name;
        if (className === 'Watermelon') {
            element = "Water";
        }
        else if (className === 'Firemelon') {
            element = "Fire";
        }
        else if (className === 'Earthmelon') {
            element = "Earth";
        }
        else if (className === 'Airmelon') {
            element = "Air";
        }
        else if (className === 'Melolemonmelon') {
            element = "";
        }
        else {
            element = "Throws error";
        }
        return "Element: ".concat(element, "\nSort: ").concat(this.melonSort, "\nElement Index: ").concat(this.elementIndex);
    };
    return Melon;
}());
var Watermelon = /** @class */ (function (_super) {
    __extends(Watermelon, _super);
    function Watermelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    return Watermelon;
}(Melon));
exports.Watermelon = Watermelon;
var Firemelon = /** @class */ (function (_super) {
    __extends(Firemelon, _super);
    function Firemelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    return Firemelon;
}(Melon));
exports.Firemelon = Firemelon;
var Earthmelon = /** @class */ (function (_super) {
    __extends(Earthmelon, _super);
    function Earthmelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    return Earthmelon;
}(Melon));
exports.Earthmelon = Earthmelon;
var Airmelon = /** @class */ (function (_super) {
    __extends(Airmelon, _super);
    function Airmelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    return Airmelon;
}(Melon));
exports.Airmelon = Airmelon;
var Melolemonmelon = /** @class */ (function (_super) {
    __extends(Melolemonmelon, _super);
    function Melolemonmelon(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.currentElement = "Water";
        return _this;
    }
    Melolemonmelon.prototype.morph = function () {
        var currentIndex = Melolemonmelon.elementCycle.indexOf(this.currentElement);
        var nextIndex = (currentIndex + 1) % Melolemonmelon.elementCycle.length;
        this.currentElement = Melolemonmelon.elementCycle[nextIndex];
    };
    Melolemonmelon.prototype.toString = function () {
        return "Element: ".concat(this.currentElement, "\nSort: ").concat(this.melonSort, "\nElement Index: ").concat(this.elementIndex);
    };
    Melolemonmelon.elementCycle = ["Water", "Fire", "Earth", "Air"];
    return Melolemonmelon;
}(Watermelon));
exports.Melolemonmelon = Melolemonmelon;
var melolemonmelon = new Melolemonmelon(12.5, "Kingsize");
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
