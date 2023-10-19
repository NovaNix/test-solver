import nerdamer from "nerdamer/all.min";
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
	isComplete()
	{
		return this.entities.every(entity => entity.isValid());
	}

	isMet()
	{
		return this.functions.every(func => func.isMet());
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

	isMet()
	{
		return Math.abs(this.solve()) < Number.EPSILON;
	}

	/**
	 * The derivative of the constraint function.
	 * The values for the equation should be pulled from the parent constraint.
	 * @param {string} changingVar The name of the variable that is changing (if changingVar is x, then the function is df/dx)
	 * @returns {number}
	 */ 
	solveDerivative(changingVar)
	{
		throw new Error("The constraint derivative function was not overridden!")
	}

	/**
	 * @param {string} variable The address of the variable to solve for
	 * @returns {number[]} The solved value of the variable 
	 */
	solveFor(variable)
	{
		throw new Error("The constraint solveFor function was not overridden!")
	}

	/**
	 * @returns {Ref[]} The data used by the constraint function
	 */
	getData()
	{
		throw new Error("The constraint getData function was not overridden!")
	}
}

// Common Constraint Functions

export class GenericCFunction extends ConstraintFunction
{
	/** @type {Ref[]} */
	data;

	// /** @type {import("nerdamer").Expression} */
	// expression;
	/** @type {string} */
	func;

	map;
	reverseMap;

	/**
	 * @param {Constraint} parent 
	 * @param {string} func 
	 * @param {*} map An object connecting the variables in the function to the references of the data. 
	 */
	constructor(parent, func, map)
	{
		super(parent);
		this.map = map;

		//this.expression = nerdamer(func);

		this.func = func;

		this.data = [];
		this.reverseMap = {};
		for (const [key, value] of Object.entries(map))
		{
			this.data.push(value);
			this.reverseMap[value.address] = key;
		}
	}

	solve()
	{
		let values = this.#getVarValues();

		// Solve the expression
		return Number(nerdamer(this.func, values).evaluate().text());
	}

	solveDerivative(changingVar)
	{
		let values = this.#getVarValues();

		let derivative = nerdamer.diff(nerdamer(this.func), this.reverseMap[changingVar]);

		console.log(`Solving function ${this.func} for derivative ${this.reverseMap[changingVar]}`);
		console.log(`Derivative: ${derivative.text()}`);

		console.log(values);

		let result = Number(derivative.evaluate(values).text())

		console.log(`Result: ${result}`);

		return result;
	}

	solveFor(variable)
	{
		//console.log(`Solving function "${this.func}" for variable "${this.reverseMap[variable]}"`);

		/** @type {import("nerdamer").Expression[]} */
		let rearranged = nerdamer(this.func).solveFor(this.reverseMap[variable]);

		let values = this.#getVarValues();

		console.log(values);

		let results = [];

		for (let eq of rearranged)
		{
			console.log(`Solving equation "${eq.text()}"`);

			// @ts-ignore
			let result = eq.evaluate(values).text();

			console.log(`Result: ${result}`);

			let numresult = Number(result);
			if (!Number.isNaN(numresult))
				results.push(numresult);
		}

		return results;
	}

	#getVarValues()
	{
		let values = {};

		for (const [key, value] of Object.entries(this.map))
		{
			if (value instanceof Ref)
			{
				values[key] = value.value;
			}
			
			else
			{
				values[key] = value;
			}
		}

		return values;
	}

	getData()
	{
		return this.data;
	}

	getLatex()
	{
		return nerdamer.convertToLaTeX(this.func);
	}
}

export class DataEqualFunction extends GenericCFunction
{
	constructor(parent, data1, data2)
	{
		super(parent, "a-b", {
			a: new Ref(data1),
			b: new Ref(data2)
		});

	}
}

// export class DataEqualFunction extends ConstraintFunction
// {
// 	/** @type {Ref} */
// 	data1;
// 	/** @type {Ref} */
// 	data2;

// 	constructor(parent, data1, data2)
// 	{
// 		super(parent);

// 		this.data1 = new Ref(data1);
// 		this.data2 = new Ref(data2);
// 	}

// 	solve()
// 	{
// 		return this.data1.value - this.data2.value;
// 	}

// 	solveDerivative(changingVar)
// 	{
// 		switch (changingVar)
// 		{
// 			case this.data1.address:
// 				return 1;
// 			case this.data2.address:
// 				return -1;
// 			default:
// 				return 0;
// 		}

// 	}

// 	solveFor(variable)
// 	{
// 		if (variable == this.data1.address)
// 		{
// 			return this.data2.value;
// 		}
// 		else if (variable == this.data2.address)
// 		{
// 			return this.data1.value;
// 		}
// 		else
// 		{
// 			return null;
// 		}
// 	}

// 	getData()
// 	{
// 		return [this.data1, this.data2];
// 	}
// }