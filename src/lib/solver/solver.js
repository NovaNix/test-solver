import {Entity} from "../entities/entity.js"
import {Point} from "../entities/point.js"

export class Sketch 
{
    /** @type {Entity[]} */
    entities = [];

    addEntity(entity)
    {
        this.entities.push(entity);
        this.entities = this.entities; // This is required to have Svelte update
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
    for (let entity of sketch.entities)
    {
        
        for (let data in entity.data)
        {
            //data.solved = false;
        }
    }

    // Set all constraints to unsolved
}