import {Entity} from "../entities/entity.js"
import {Point} from "../entities/point.js"
import { writable } from 'svelte/store';
import { get } from 'svelte/store'
/** import("svelte/store").Writable */

export class Sketch 
{
    /** @type {import("svelte/store").Writable<Entity[]>} */
    entities = writable([]);

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