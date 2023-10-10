import {Sketch} from "../main.js"

/**
 * 
 * @param {Sketch} sketch 
 */
export function solve(sketch)
{
    // Solve as much as we can before we use Newton's Method

    // Set all elements to unsolved
    for (let entity of sketch.entities)
    {
        
        for (let data in entity.data)
        {
            data.solved = false;
        }
    }

    // Set all constraints to unsolved
}