import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, DataEqualFunction, GenericCFunction} from "./constraint.js";
import {Point} from "../entities/point.js";
import {Circle} from "../entities/circle.js";
import {Line} from "../entities/line.js";

// This file is for constraints that apply only to lines

export class Parallel extends Constraint 
{
    l1;
    l2;

    /**
     * @param {string} name 
     * @param {import("../entities/entity.js").Addressable} l1 
     * @param {import("../entities/entity.js").Addressable} l2 
     */
	constructor(name, l1, l2)
	{
		super(name, "parallel", "line-line");

        this.l1 = new Ref(l1);
        this.l2 = new Ref(l2);

        this.entities.push(this.l1);
        this.entities.push(this.l2);

        /** @type {Line} */
        // @ts-ignore
        let line1 = this.l1.resolve();
        /** @type {Line} */
        // @ts-ignore
        let line2 = this.l2.resolve();

        let p1 = line1.p1;
        let p2 = line1.p2;
        let p3 = line2.p1;
        let p4 = line2.p2;
        // To avoid division by zero, we convert dy/dx=db/da to dy*da=dx*db
        // dx = x - h
        // dy = y - k
        // da = a - i
        // db = b - j
        this.functions.push(new GenericCFunction(this, "(a-i)(y-h) - (b-j)(x-h)", {
            // Line 1 Point 2
            x: new Ref(p2.data.x),
            y: new Ref(p2.data.y),
            // Line 1 Point 1
            h: new Ref(p1.data.x),
            k: new Ref(p1.data.y),
            // Line 2 Point 2
            a: new Ref(p4.data.x),
            b: new Ref(p4.data.y),
            // Line 2 Point 1
            i: new Ref(p3.data.x),
            j: new Ref(p3.data.y)
		}));
	}
}

export class Perpendicular extends Constraint
{
    l1;
    l2;

    /**
     * @param {string} name 
     * @param {import("../entities/entity.js").Addressable} l1 
     * @param {import("../entities/entity.js").Addressable} l2 
     */
	constructor(name, l1, l2)
	{
		super(name, "perpendicular", "line-line");

        this.l1 = new Ref(l1);
        this.l2 = new Ref(l2);

        this.entities.push(this.l1);
        this.entities.push(this.l2);

        /** @type {Line} */
        // @ts-ignore
        let line1 = this.l1.resolve();
        /** @type {Line} */
        // @ts-ignore
        let line2 = this.l2.resolve();

        let p1 = line1.p1;
        let p2 = line1.p2;
        let p3 = line2.p1;
        let p4 = line2.p2;
        // To avoid division by zero, we convert dy/dx=db/da to dy*da=dx*db
        // dx = x - h
        // dy = y - k
        // da = a - i
        // db = b - j
        this.functions.push(new GenericCFunction(this, "(b-j)(y-k)+(a-i)(x-h)", {
			// Line 1 Point 2
            x: new Ref(p2.data.x),
            y: new Ref(p2.data.y),
            // Line 1 Point 1
            h: new Ref(p1.data.x),
            k: new Ref(p1.data.y),
            // Line 2 Point 2
            a: new Ref(p4.data.x),
            b: new Ref(p4.data.y),
            // Line 2 Point 1
            i: new Ref(p3.data.x),
            j: new Ref(p3.data.y)
		}));
	}
}

export class Midpoint extends Constraint
{
    p1;
    l1;

    /**
     * @param {string} name 
     * @param {import("../entities/entity.js").Addressable} p1 
     * @param {import("../entities/entity.js").Addressable} l1
     */
	constructor(name, p1, l1)
	{
		super(name, "midpoint", "point-line");

        this.p1 = new Ref(p1);
        this.l1 = new Ref(l1);

        this.entities.push(this.p1);
        this.entities.push(this.l1);

        /** @type {Line} */
        // @ts-ignore
        let point1 = this.p1.resolve();
        /** @type {Line} */
        // @ts-ignore
        let line1 = this.l1.resolve();

        this.functions.push(new GenericCFunction(this, "x-((h+i)/2)", {
            x: new Ref(point1.data.x),
            h: new Ref(line1.p1.data.x),
            i: new Ref(line1.p2.data.x)
		}));
        // This is the same function as above, except the x's are replaced with y's. 
        this.functions.push(new GenericCFunction(this, "x-((h+i)/2)", {
            x: new Ref(point1.data.y),
            h: new Ref(line1.p1.data.y),
            i: new Ref(line1.p2.data.y)
		}));
	}
}

export class ColinearPoint extends Constraint
{
    p1;
    l1;

    /**
     * @param {string} name 
     * @param {import("../entities/entity.js").Addressable} p1 
     * @param {import("../entities/entity.js").Addressable} l1
     */
	constructor(name, p1, l1)
	{
		super(name, "midpoint", "point-line");

        this.p1 = new Ref(p1);
        this.l1 = new Ref(l1);

        this.entities.push(this.p1);
        this.entities.push(this.l1);

        /** @type {Line} */
        // @ts-ignore
        let point1 = this.p1.resolve();
        /** @type {Line} */
        // @ts-ignore
        let line1 = this.l1.resolve();

        this.functions.push(new ColinearPointFunction(this, point1, line1));
	}
}

export class ColinearPointFunction extends GenericCFunction
{
    constructor(parent, point, line)
    {
        let p = new Ref(point).resolve();
        let l = new Ref(line).resolve();

        super(parent, "abs((c-a)(b-y)-(a-x)(d-b))/sqrt((a-c)^2+(b-d)^2)", {
			a: new Ref(l.p1.data.x),
			b: new Ref(l.p1.data.y),
            c: new Ref(l.p2.data.x),
            d: new Ref(l.p2.data.y),

            x: new Ref(p.data.x),
            y: new Ref(p.data.y)
		});
    }
}
