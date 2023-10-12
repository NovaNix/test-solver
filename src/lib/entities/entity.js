import { writable } from 'svelte/store';

export class FloatData
{
    /** @type {number} */
    value;

    solved = false;
    fixed = false;

    constructor(value)
    {
        this.value = value;
    }
}

export class Entity
{
    // The parent entity of this entity. If this is a top-level entity, this will be null
    /** @type {Entity | null} */
    parent;

    name;
    type;

    #construction = false;
    #fixed = false;

    // These two are for the UI
    selected = writable(false);
    hover = writable(false);

    // An object containing all of the relevant data for this entity. This includes both FloatData and other Entities
    data;

    /**
     * @param {string} name The name of the entity to be created. If this is a child entity, it does not need the parent's name included.
     * @param {string} type 
     */
    constructor(name, type)
    {
        this.name = name;
        this.type = type;
        
        this.data = {};
    }

    get fullName()
    {
        if (this.parent)
        {
            return this.parent.fullName + "." + this.name;
        }
        else
        {
            return this.name;
        }
    }

    get construction()
    {
        return this.#construction;
    }

    set construction(value)
    {
        this.#construction = value;

        for (let valueName in this.data)
        {
            this.data[valueName].construction = value;
        }
    }

    get fixed()
    {
        return this.#fixed;
    }

    set fixed(value)
    {
        this.#fixed = value;

        for (let valueName in this.data)
        {
            this.data[valueName].fixed = value;
        }
    }

}
