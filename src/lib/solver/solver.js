import {Entity} from "../entities/entity.js"
import {Point} from "../entities/point.js"
import {Line} from "../entities/line.js"
import { writable } from 'svelte/store';
import { get } from 'svelte/store'
import {Constraint} from "../constraints/constraint.js"
/** import("svelte/store").Writable */

/** @type {import("svelte/store").Writable<Entity[]>} */
export const selected = writable([]);

export class Sketch 
{
    /** @type {import("svelte/store").Writable<Entity[]>} */
    entities = writable([]);
    /** @type {import("svelte/store").Writable<Constraint[]>} */
    constraints = writable([]);

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
    }

    hasEntity(name)
    {
        let entities = get(this.entities);

        for (let entity of entities)
        {
            if (entity.name == name)
            {
                return true;
            }
        }

        return false;
    }

}

export const sketch = new Sketch();

// Set up the test elements

sketch.addEntity(new Point("A", 0, 0));
sketch.addEntity(new Point("B", 1, 2));

let line = new Line("Line 0", -2, -1, -1, 1);
line.construction = true;

sketch.addEntity(line)

export function select(entityname)
{
    let entities = get(sketch.entities);

    for (let entity of entities)
    {
        if (entity.name == entityname)
        {
            entity.selected.set(true);

            selected.update(items => {
                items.push(entity);
                return items;
            });

            break; // As there should only be one entity with each name, we can stop here
        }
    }
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

export function solve()
{
    // Solve as much as we can before we use Newton's Method

    // Set all elements to unsolved
    // for (let entity of sketch.entities)
    // {
        
    //     for (let data in entity.data)
    //     {
    //         //data.solved = false;
    //     }
    // }

    // Set all constraints to unsolved
}