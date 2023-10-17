import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, DataEqualFunction} from "./constraint.js";
import {Point} from "../entities/point.js";

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

		this.functions.push(new DataEqualFunction(this, p1.data["x"].address, p2.data["x"].address));
		this.functions.push(new DataEqualFunction(this, p1.data["y"].address, p2.data["y"].address));
	}
}

export class CoincidentPointCircle extends Coincident
{
	
}