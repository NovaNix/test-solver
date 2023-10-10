import {Entity, FloatData} from "../entity.js"

export class Line extends Entity
{
    infinite = false;


    constructor(p1, p2)
    {
        super();
        this.p1 = p1;
        this.p2 = p2;
    }

}