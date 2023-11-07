import {Entity, FloatData} from "./entity.js";
import {Point} from "./point.js"
import * as VecMath from "../utils/vecmath.js";

export class Line extends Entity {

    infinite = false;

    constructor(name, x1, y1, x2, y2) {
        super(name, "line");

        this.data = {
            p1: new Point("p1", x1, y1),
            p2: new Point("p2", x2, y2),
        };

        this.p1.parent = this;
        this.p2.parent = this;
    }

    colinear(x, y) 
    {
        let dir = VecMath.normalize(this.x2 - this.x1, this.y2 - this.y1);
        let dir2 = VecMath.normalize(x - this.x1, y - this.y1);

        return (1 - Math.abs(VecMath.dot(dir[0], dir[1], dir2[0], dir2[1]))) < Number.EPSILON;
    }

    /** Returns the Entity of p1. If you just want the vector of the point, use p1vec() */
    get p1() {
        return this.data.p1;
    }

    /** Returns the Entity of p2. If you just want the vector of the point, use p2vec() */
    get p2() {
        return this.data.p2;
    }

    /** Returns the components of p1, not the p1 entity itself */
    get p1vec() {
        return [this.data.p1.x, this.data.p1.y];
    }

    /** Returns the components of p2, not the p2 entity itself */
    get p2vec() {
        return [this.data.p2.x, this.data.p2.y];
    }

    get x1() {
        return this.data.p1.x;
    }

    get y1() {
        return this.data.p1.y;
    }

    get x2() {
        return this.data.p2.x;
    }

    get y2() {
        return this.data.p2.y;
    }

}