import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, DataEqualFunction, GenericCFunction} from "./constraint.js";
import {Point} from "../entities/point.js";
import {Circle} from "../entities/circle.js";
import { Line } from "../entities/line.js";

class Coincident extends Constraint 
{
	constructor(name, subtype)
	{
		super(name, "coincident", subtype);
	}
}

export class CoincidentPoints extends Coincident
{
	/** @type {Ref} */
	p1;
	/** @type {Ref} */
	p2;

	/**
	 * 
	 * @param {string} name The name of the constraint
	 * @param {Point} p1 
	 * @param {Point} p2 
	 */
	constructor(name, p1, p2)
	{
		super(name, "points");

		this.p1 = new Ref(p1);
		this.p2 = new Ref(p2);

		this.entities.push(this.p1);
		this.entities.push(this.p2);

		this.values = {
			p1: this.p1,
			p2: this.p2
		}

		this.functions.push(new DataEqualFunction(this, p1.data["x"].address, p2.data["x"].address));
		this.functions.push(new DataEqualFunction(this, p1.data["y"].address, p2.data["y"].address));
	}
}

export class CoincidentPointCircle extends Coincident
{
	/** @type {Ref} */
	p1;
	/** @type {Ref} */
	circle;

	/**
	 * 
	 * @param {string} name The name of the constraint
	 * @param {Point} p1 
	 * @param {Circle} circ
	 */
	constructor(name, p1, circ)
	{
		super(name, "point-circle");

		this.p1 = new Ref(p1);
		this.circle = new Ref(circ);

		this.entities.push(this.p1);
		this.entities.push(this.circle);

		this.values = {
			p1: this.p1,
			circle: this.circle
		}

		this.functions.push(new GenericCFunction(this, "r^2-((x-h)^2 + (y-k)^2)", {
			x: new Ref(p1.data["x"]),
			y: new Ref(p1.data["y"]),
			r: new Ref(circ.data["r"]),
			h: new Ref(circ.p.data["x"]),
			k: new Ref(circ.p.data["y"]),
		}))
	}
}