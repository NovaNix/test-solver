import { Ref } from "../entities/entity.js";
import {Constraint, ConstraintFunction, DataEqualFunction} from "./constraint.js";
import {Point} from "../entities/point.js";

class HoriVert extends Constraint 
{
	constructor(name, subtype)
	{
		super(name, "horivert", subtype);
	}
}