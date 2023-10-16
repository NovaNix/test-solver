import {Entity} from "../entities/entity.js"
import {Point} from "../entities/point.js"
import {Line} from "../entities/line.js"
import {Circle} from "../entities/circle.js"
import { writable } from 'svelte/store';
import { get } from 'svelte/store'
import {Constraint, ConstraintFunction} from "../constraints/constraint.js"
import { CoincidentPoints } from "../constraints/coincident.js";
import { FloatData } from "../entities/entity.js";

export const SELECT_MODE_NEW = 0;
export const SELECT_MODE_ADD = 1;

/** @type {import("svelte/store").Writable<Entity[]>} */
export const selected = writable([]);
export let selectMode = SELECT_MODE_NEW;

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

    addEntity(entity)
    {
        console.log("Adding Entity: " + entity.name);

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
pointA.fixed = true;
let pointB = sketch.addEntity(new Point("B", 1, 2));
pointB.fixed = true;

let line = new Line("Line 0", -2, -1, -1, 1);
line.construction = true;

sketch.addEntity(line)

sketch.addEntity(new Circle("Circle 0", 1, 1, 2));

// Add the test constraints
sketch.addConstraint(new CoincidentPoints("Test Coincident 1", pointA, line.p1));
sketch.addConstraint(new CoincidentPoints("Test Coincident 2", pointB, line.p2));

export function select(entityname)
{
    if (selectMode == SELECT_MODE_NEW)
    {
        clearSelection();
    }

    let entity = sketch.getEntity(entityname);

    if (entity == null)
    {
        console.error("Tried to select Entity " + entityname + ", but it could not be found in the sketch!");
        return;
    }

    entity.selected.set(true);
    
    selected.update(items => {
        items.push(entity);
        return items;
    });

    
}

export function clearSelection()
{
    // Clear the selected flag on the entities
    let selectedEntities = get(selected);

    for (let entity of selectedEntities)
    {
        entity.selected.set(false);
    }

    // Clear the selected list
    selected.set([]);
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
    }

    sketch.updateDisplay();
}

// Solves the sketch in a stepped manner
export function* solve()
{
    // Set all of the entities to unsolved
    let entities = get(sketch.entities);

    for (let entity of entities)
    {
        entity.solved = false; // This should also update all of the sub entities
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
            let unknown = func.getData();

            for (let data of unknown)
            {
                if (data.resolve().solved)
                {
                    // Remove the known value from the unknown list
                    unknown.splice(unknown.indexOf(data), 1);
                }
            }

            // If there's only one unknown value, we can solve the constraint function!
            if (unknown.length == 1)
            {
                console.log(`Found a solvable constraint function! (Constraint:  ${func.parent.name})`);

                /** @type {FloatData} */
                let data = unknown[0].resolve();

                let solvedValue = func.solveFor(data.address);

                data.value = solvedValue;

                data.solved = true;

                progressed = true;

                // Remove the constraint function from the list
                functions.splice(functions.indexOf(func), 1);

                yield;
            }

            if (unknown.length == 0)
            {
                // All of the values are known! We need to make sure this constraint is solved before we remove it
                if (!func.isMet())
                    throw new Error("All of the values of the function are known, but the function is not met!");

                // The constraint is solved!
                // Remove the constraint function from the list
                functions.splice(functions.indexOf(func), 1);
            }
        }

        simpleSolved = !progressed;
    }

    console.log("Finished simple solve");
    console.log("Remaining constraint functions: " + functions.length);


}