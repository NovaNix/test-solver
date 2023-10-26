import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, DataEqualFunction} from "./constraint.js";
import {Point} from "../entities/point.js";

class Horizontal extends Constraint 
{
	constructor(name, subtype)
	{
		super(name, "horizontal", subtype);
	}
}

export class HorizontalPoints extends Horizontal
{
	/** @type {Ref} */
	p1;
	/** @type {Ref} */
	p2;

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

		this.functions.push(new DataEqualFunction(this, p1.data["y"].address, p2.data["y"].address));
	}
}

export class HorizontalLine extends Horizontal
{
	/** @type {Ref} */
	l1;

	constructor(name, l1)
	{
		super(name, "line");

		this.l1 = new Ref(l1);

		this.entities.push(this.l1);

		this.values = {
			l1: this.l1
		}

		this.functions.push(new DataEqualFunction(this, l1.p1.data["y"].address, l1.p2.data["y"].address));
	}
}

class Vertical extends Constraint 
{
	constructor(name, subtype)
	{
		super(name, "vertical", subtype);
	}
}

export class VerticalPoints extends Vertical
{
	/** @type {Ref} */
	p1;
	/** @type {Ref} */
	p2;

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
	}
}

export class VerticalLine extends Vertical
{
	/** @type {Ref} */
	l1;

	constructor(name, l1)
	{
		super(name, "line");

		this.l1 = new Ref(l1);

		this.entities.push(this.l1);

		this.values = {
			l1: this.l1
		}

		this.functions.push(new DataEqualFunction(this, l1.p1.data["x"].address, l1.p2.data["x"].address));
	}
}