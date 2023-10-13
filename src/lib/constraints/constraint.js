import { Entity, Ref, FloatData } from "../entities/entity";

export class Constraint
{
    name;

	/**  
	 * The type of constraint (ex "coincident", "parallel", "perpendicular", etc)
	 * @type {string}
	*/
	type;

	/**
	 * The subtype of constraint (ex "point-line", "point-point", "line-line", etc)
	 * @type {string}
	*/
	subtype;

	/**
	 * The functions that must be solved to satisfy the constraint
	 * @type {ConstraintFunction[]}
	 */
	functions;

	/** 
	 * The entities affected by the constraint
	 * @type {Ref[]}
	*/
	entities;

	constructor(name, type, subtype)
	{
		if (this.constructor === Constraint) 
		{
			throw new Error("Constraint is an abstract class and cannot be instantiated directly.");
		}

		this.name = name;
		this.type = type;
		this.subtype = subtype;

		this.functions = [];
		this.entities = [];
	}

	/**
	 * @returns {boolean} Whether or not the constraint has all of the entities it needs
	 */
	get isComplete()
	{
		return this.entities.every(entity => entity.isValid());
	}


}

/**
 * An equation that must be solved to satisfy a constraint
 */
export class ConstraintFunction
{
	/** @type {Constraint} */
	parent;

	constructor(parent)
	{
		this.parent = parent;
	}

	/**
	 * The actual constraint function.
	 * The values for the equation should be pulled from the parent constraint.
	 * @returns {number} The solved value of the constraint function
	 */
	solve()
	{
		throw new Error("The constraint function was not overridden!")
	}

	/**
	 * The derivative of the constraint function.
	 * The values for the equation should be pulled from the parent constraint.
	 * @param {string} changingVar The name of the variable that is changing (if changingVar is x, then the function is df/dx)
	 */ 
	solveDerivative(changingVar)
	{
		throw new Error("The constraint derivative function was not overridden!")
	}


	solveFor(variable)
	{
		throw new Error("The constraint solveFor function was not overridden!")
	}
}

// Common Constraint Functions

export class DataEqualFunction extends ConstraintFunction
{
	/** @type {Ref} */
	data1;
	/** @type {Ref} */
	data2;

	constructor(parent, data1, data2)
	{
		super(parent);

		this.data1 = data1;
		this.data2 = data2;
	}

	solve()
	{
		return this.data1.value - this.data2.value;
	}

	solveDerivative(changingVar)
	{
		switch (changingVar)
		{
			case this.data1.address:
				return 1;
			case this.data2.address:
				return -1;
			default:
				return 0;
		}

	}

	solveFor(variable)
	{
		if (variable == this.data1.address)
		{
			return this.data2.value;
		}
		else if (variable == this.data2.address)
		{
			return this.data1.value;
		}
		else
		{
			return null;
		}
	}
}
{

}