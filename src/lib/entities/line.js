import {Entity, FloatData} from "./entity.js";

export class Line extends Entity {

    infinite = false;

    constructor(name, x1, y1, x2, y2) {
        super(name, "line");

        this.data = {
            x1: new FloatData(x1),
            y1: new FloatData(y1),
            x2: new FloatData(x2),
            y2: new FloatData(y2)
        };
    }

    get x1() {
        return this.data.x1.value;
    }

    get y1() {
        return this.data.y1.value;
    }

    get x2() {
        return this.data.x2.value;
    }

    get y2() {
        return this.data.y2.value;
    }

}