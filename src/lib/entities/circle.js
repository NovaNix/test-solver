import {Entity, FloatData} from "./entity.js";
import {Point} from "./point.js"

export class Circle extends Entity 
{

    constructor(name, x, y, r)
    {
        super(name, "circle");

        this.data = {
            p: new Point("p", x, y),
            r: new FloatData(this, "r", r),
        };

        this.p.parent = this;
    }

    get p()
    {
        return this.data.p;
    }

    get x()
    {
        return this.data.p.x;
    }

    get y()
    {
        return this.data.p.y;
    }

    get radius()
    {
        return this.data.r.value;
    }

}