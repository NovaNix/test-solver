import { writable } from 'svelte/store';

export class DataType
{

}

export class FloatData extends DataType
{
    /** @type {number} */
    value;

    solved = false;

    constructor(value)
    {
        super();
        this.value = value;
    }
}

export class Entity
{
    name;
    type;

    construction = false;
    fixed = false;

    // These two are for the UI
    selected = writable(false);
    hover = writable(false);

    data;

    constructor(name, type)
    {
        this.name = name;
        this.type = type;
        
        this.data = {};
    }

}
