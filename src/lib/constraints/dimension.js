import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, DataEqualFunction} from "./constraint.js";
import {Point} from "../entities/point.js";

class Dimension extends Constraint 
{
	constructor(name, subtype)
	{
		super(name, "dimension", subtype);
	}
}

class Length extends Dimension
{
    /** @type {Ref} */
    p1;
    /** @type {Ref} */
    p2;
    /** @type {number} */
    length;

    constructor(name, p1, p2, length)
    {
        super(name, "length");

        this.p1 = new Ref(p1);
        this.p2 = new Ref(p2);

        this.length = length;

        this.entities.push(this.p1);
        this.entities.push(this.p2);



    }
}

class LengthFunction extends ConstraintFunction
{
    /** @type {Ref} */
    p1;
    /** @type {Ref} */
    p2;

    constructor(parent, p1, p2, length)
    {
        super(parent);

        this.p1 = p1;
        this.p2 = p2;
    }

    
}