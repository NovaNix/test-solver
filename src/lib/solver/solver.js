import {Entity} from "../entities/entity.js"
import {Point} from "../entities/point.js"
import {Line} from "../entities/line.js"
import {Circle} from "../entities/circle.js"
import { writable } from 'svelte/store';
import { get } from 'svelte/store'
import {Constraint, ConstraintFunction} from "../constraints/constraint.js"
import { CoincidentPoints, CoincidentPointCircle } from "../constraints/coincident.js";
import { FloatData, Ref } from "../entities/entity.js";
import { ColinearPoint, Midpoint, Perpendicular } from "../constraints/lines.js";
import { newtonSolver } from "./newtonSolver.js";

export class Sketch 
{
    /** @type {import("svelte/store").Writable<Entity[]>} */
    entities = writable([]);
    /** @type {import("svelte/store").Writable<Constraint[]>} */
    constraints = writable([]);

    /** @type {import("svelte/store").Writable<Constraint[]>} */
    tempConstraints = writable([]);

    // Map containing all entities, and sub entities
    entityMap = new Map();

    /**
     * Causes Svelte to redraw the sketch
     */
    updateDisplay()
    {
        this.entities.update(items => {
            return items;
        });

        this.constraints.update(items => {
            return items;
        });
    }

    /**
     * @template {Entity} E
     * @param {E} entity 
     * @returns {E}
     */
    addEntity(entity)
    {
        this.entities.update(items => {
            items.push(entity);
            return items;
        });

        this.#addEntityMap(entity);

        return entity; // Returns the added entity for chaining
    }

    /**
     * Recursively adds the entity and all of the sub entities to the entity map
     * @param {Entity} entity 
     */
    #addEntityMap(entity)
    {
        this.entityMap.set(entity.address, entity);

        console.log("Adding entity " + entity.address)

        // add the sub entities to the map
        for (let sub of Object.values(entity.data))
        {
            if (sub instanceof Entity)
            {
                this.#addEntityMap(sub);
            }
        }

    }

    getEntity(address)
    {
        return this.entityMap.get(address);
    }

    hasEntity(name)
    {
        return this.getEntity(name) != null;
    }

    addConstraint(constraint)
    {
        console.log("Adding Constraint: " + constraint.name);

        this.constraints.update(items => {
            items.push(constraint);
            return items;
        });

        return constraint; // Returns the added constraint for chaining
    }

    getConstraint(name)
    {
        let constraints = get(this.constraints);

        for (let constraint of constraints)
        {
            if (constraint.name == name)
            {
                return constraint;
            }
        }

        return null;
    }

    hasConstraint(name)
    {
        return this.getConstraint(name) != null;
    }

}

export const sketch = new Sketch();

// Set up the test elements

let pointA = sketch.addEntity(new Point("A", 0, 0));
pointA.fixed.value = true;
let pointB = sketch.addEntity(new Point("B", 1, 2));
pointB.fixed.value = true;

let pointC = sketch.addEntity(new Point("C", 2, 1));
pointC.fixed.value = true;

let line = sketch.addEntity(new Line("Line 0", -2, -1, -1, 1));
line.construction.value = true;

let line2 = sketch.addEntity(new Line("Line 1", -1, -1, 1, -2));
line2.construction.value = true;

let mid = sketch.addEntity(new Point("Mid", 2, -3));

let circle = sketch.addEntity(new Circle("Circle 0", 1, 1, 2));

// Add the test constraints
// Set up the construction Line
sketch.addConstraint(new CoincidentPoints("Test Coincident 1", pointA, line.p1));
sketch.addConstraint(new CoincidentPoints("Test Coincident 2", pointB, line.p2));

// Set up the circle
sketch.addConstraint(new CoincidentPointCircle("Test Circle Coincident 1", pointA, circle));
sketch.addConstraint(new CoincidentPointCircle("Test Circle Coincident 2", pointB, circle));
sketch.addConstraint(new CoincidentPointCircle("Test Circle Coincident 3", pointC, circle));

// Set up the perpendicular chord
sketch.addConstraint(new Midpoint("Test Midpoint 1", mid, line));

//sketch.addConstraint(new ColinearPoint("Test Colinear 1", mid, line2));
sketch.addConstraint(new CoincidentPointCircle("Circle Coincident Chord 1", line2.p1, circle));
sketch.addConstraint(new CoincidentPointCircle("Circle Coincident Chord 2", line2.p2, circle));

sketch.addConstraint(new Perpendicular("Test Perpendicular 1", line, line2));
// sketch.addConstraint()

export function updateDisplay()
{
    sketch.updateDisplay();
}

// Actual solver code

let solveSession = solve();

// A wrapper for the solve function
export function solveStepped()
{
    let next = solveSession.next();
    
    if (next.done)
    {
        solveSession = solve();
        return true;
    }

    sketch.updateDisplay();
    return false;
}

export function solveComplete()
{
    while (!solveStepped()) {}
}

// Solves the sketch in a stepped manner
export function* solve()
{
    // Set all of the entities to unsolved
    let entities = get(sketch.entities);

    for (let entity of entities)
    {
        entity.clearSolveInfo();
    }

    // Solve all constraint functions with one missing value

    let constraints = [...get(sketch.constraints)];
    /** @type {ConstraintFunction[]} */
    let functions = [];

    constraints.forEach(constraint => functions.push(...constraint.functions));

    let simpleSolved = false;

    console.log("Started simple solve");

    while (!simpleSolved)
    {
        let progressed = false;

        for (let func of functions)
        {
            let unknown = func.getData().filter(x => !x.resolve().solved);

            // If there's only one unknown value, we can solve the constraint function!
            if (unknown.length == 1)
            {
                console.log(`Found a solvable constraint function! (Constraint:  ${func.parent.name})`);

                /** @type {FloatData} */
                let data = unknown[0].resolve();

                let potentialValues = func.solveFor(data.address);

                if (data.potentialValues == null)
                {
                    data.potentialValues = potentialValues;
                }

                // Get the intersection between the newly calculated potential values and the previous potential values
                data.potentialValues = data.potentialValues.filter(x => potentialValues.includes(x));

                if (data.potentialValues.length == 1)
                {
                    data.value = data.potentialValues[0];

                    data.solved = true;

                    progressed = true;
                }
            }

            if (unknown.length == 0)
            {
                console.log("Constraint function has all variables known! Checking if met.");
                console.log("Result: " + func.solve());
                // All of the values are known! We need to make sure this constraint is solved before we remove it
                if (!func.isMet())
                    throw new Error("All of the values of the function are known, but the function is not met!");

                // The constraint is solved!

                // Remove the constraint function from the list
                functions.splice(functions.indexOf(func), 1); // Note: we may have to remove the constraint function earlier than this to prevent it from being solved multiple times. For now though it's fine

                progressed = true;
            }
        }

        simpleSolved = !progressed;
    }

    console.log("Finished simple solve");
    console.log("Remaining constraint functions: " + functions.length);
    yield;

    console.log("Beginning complex solve using newton's method");

    /** @type {Ref[]} */
    let unknowns = [];

    for (let func of functions)
    {
        func.getData().forEach(x => {
            if (x.resolve().solved)
                return;
            if (unknowns.some(y => y.address === x.address))
                return;

            unknowns.push(x);
        });
    }

    let unknownFuncList = [];
    functions.forEach(func => {unknownFuncList.push(func.getFunction())});

    console.log(`Remaining Functions (${functions.length}):`);
    console.table(unknownFuncList);
    console.log(`Remaining Unknowns (${unknowns.length}):`);
    console.table(unknowns);

    let newton = newtonSolver(functions, unknowns);

    let solving = true;
    let iterations = 0;

    while (solving)
    {
        newton.next();

        // Prepare for next loop

        iterations++;

        if (iterations > 100)
        {
            console.error("Solve failed! Too many iterations!");
            solving = false;
        }

        yield;
    }

}