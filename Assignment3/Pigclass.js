"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pig = void 0;
var Pig = /** @class */ (function () {
    function Pig() {
        this.name = getInputValue('name');
        this.height = getInputValue('height');
        this.weight = getInputValue('weight');
        this.personality = getInputValue('personality');
        this.category = getInputValue('select');
        this.ability = getInputValue('ability');
    }
    return Pig;
}());
exports.Pig = Pig;
