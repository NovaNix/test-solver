import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, GenericCFunction, DataEqualFunction} from "./constraint.js";
import {Point} from "../entities/point.js";

export const DISTANCE_REGULAR = 0;
export const DISTANCE_HORIZONTAL = 1;
export const DISTANCE_VERTICAL = 2;

class Dimension extends Constraint 
{
	constructor(name, subtype)
	{
		super(name, "dimension", subtype);
	}
}

class Distance extends Dimension
{
    /** @type {Ref} */
    p1;
    /** @type {Ref} */
    p2;
    /** @type {number} */
    length;

    #disttype;

    constructor(name, p1, p2, length, distanceType)
    {
        super(name, "length");

        this.p1 = new Ref(p1);
        this.p2 = new Ref(p2);

        this.length = length;

        this.entities.push(this.p1);
        this.entities.push(this.p2);

        this.values = {
            p1: this.p1,
            p2: this.p2,
            length: this.length
        }

        this.distanceType = distanceType; // This also adds the functions
    }

    set distanceType(type)
    {
        this.#disttype = type;

        this.functions = [];

        switch (type)
        {
            case DISTANCE_REGULAR:
                this.functions.push(new DistanceFunction(this, this.p1, this.p2, this.length));
                break;
            case DISTANCE_HORIZONTAL:
                this.functions.push(new DistanceHFunction(this, this.p1, this.p2, this.length));
                break;
            case DISTANCE_VERTICAL:
                this.functions.push(new DistanceVFunction(this, this.p1, this.p2, this.length));
                break;
        }
    }

    get distanceType()
    {
        return this.#disttype;
    }
}

class DistanceFunction extends GenericCFunction
{

    constructor(parent, p1, p2, length)
    {
        super(parent, "0=l-sqrt((x-a)^2 + (y-b)^2)", {
            l: length,
            a: new Ref(p1.x),
            b: new Ref(p1.y),
            x: new Ref(p2.x),
            y: new Ref(p2.y)
        });
    }   
}

class DistanceHFunction extends GenericCFunction 
{
    constructor(parent, p1, p2, length)
    {
        super(parent, "0=l-abs(a-x)", {
            l: length,
            a: new Ref(p1.x),
            b: new Ref(p1.y),
            x: new Ref(p2.x),
            y: new Ref(p2.y)
        });
    } 
}

class DistanceVFunction extends GenericCFunction 
{
    constructor(parent, p1, p2, length)
    {
        super(parent, "0=l-abs(b-y)", {
            l: length,
            a: new Ref(p1.x),
            b: new Ref(p1.y),
            x: new Ref(p2.x),
            y: new Ref(p2.y)
        });
    } 
}