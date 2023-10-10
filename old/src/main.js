import {addEntity, canvas} from './renderer.js';
import {Entity} from "./solver/entity.js"
import {Point} from './solver/entities/point.js';
import { Constraint } from './solver/constraints.js';

export class Sketch
{
    /** @type {Entity[]} */
    entities = [];
    /** @type {Constraint[]} */
    constraints = [];

    constructor()
    {

    }

    addEntity(entity)
    {
        this.entities.push(entity);
        addEntity(entity);
    }
}

let sketch = new Sketch();

sketch.addEntity(new Point(0, 0));
sketch.addEntity(new Point(1, 1));
sketch.addEntity(new Point(10, 0));



