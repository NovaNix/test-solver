import {Entity, FloatData} from "./entity.js";

export class Point extends Entity
{

    constructor(name, x, y)
    {
        super(name, "point");

        this.data = {
            x: new FloatData(this, "x", x),
            y: new FloatData(this, "y", y)
        };

    }

    /**
     * @returns {number}
     */
    get x()
    {
        return this.data.x.value;
    }

    /**
     * @returns {number}
     */
    get y()
    {
        return this.data.y.value;
    }
}