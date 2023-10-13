import {Entity} from "../entities/entity.js"
import {Point} from "../entities/point.js"
import {Line} from "../entities/line.js"
import { writable } from 'svelte/store';
import { get } from 'svelte/store'
import {Constraint} from "../constraints/constraint.js"
import { CoincidentPoints } from "../constraints/coincident.js";

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

        return entity; // Returns the added entity for chaining
    }

    getEntity(address)
    {
        let entities = get(this.entities);

        let nameList = address.split(".");

        let entityList = [...entities];

        while (entityList.length > 0)
        {
            let entity = entityList.shift();

            if (entity.name == nameList[0])
            {
                nameList.shift(); // Remove the found name from the list

                if (nameList.length == 0)
                {
                    return entity;
                }

                entityList = Object.values(entity.data); // Set the entityList to the data of the found entity
            }   
        }

        // No element was found...
        return null;
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
let pointB = sketch.addEntity(new Point("B", 1, 2));

let line = new Line("Line 0", -2, -1, -1, 1);
line.construction = true;

sketch.addEntity(line)

// Add the test constraints
sketch.addConstraint(new CoincidentPoints("Test Coincident", pointA, pointB));

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

// DO NOT MODIFY THE SKETCH IN BETWEEN STEPS! IT WILL BREAK!
export function* solveStepped()
{

}