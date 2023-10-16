import { writable } from 'svelte/store';
import {sketch} from "../solver/solver.js";

/**
 * @typedef Addressable
 * @property {string} address
 */

/**
 * @implements {Addressable}
 */
export class FloatData
{
    /** @type {Entity} */
    parent;

    /** @type {string} */
    name;

    /** @type {number} */
    value;

    #solved = false;
    #fixed = false;

    /**
     * 
     * @param {Entity} parent The entity this data belongs to
     * @param {number} value 
     */
    constructor(parent, name, value)
    {
        this.parent = parent;
        this.name = name;
        this.value = value;
    }

    get address()
    {
        return this.parent.address + ":" + this.name;
    }

    get fixed()
    {
        return this.#fixed;
    }

    set fixed(value)
    {
        this.#fixed = value;

        this.#solved = this.#fixed;
    }

    get solved()
    {
        return this.#solved;
    }

    set solved(value)
    {
        if (!this.#fixed)
        {
            this.#solved = value;
        }
    }
}

/**
 * @implements {Addressable}
 */
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

    get address()
    {
        if (this.parent)
        {
            return this.parent.address + "." + this.name;
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

    set solved(value)
    {
        for (let valueName in this.data)
        {
            this.data[valueName].solved = value;
        }
    }

    get solved()
    {
        return Object.values(this.data).every(value => value.solved);
    }

}

/**
 * A reference to an entity or some data. This is used to avoid having to pass around the actual entity object.
 * Basically just a wrapper for a string containing the address of the thing
 */
export class Ref
{
    /** @type {string} */
    address;

    /**
     * @param {Addressable | string} thing The thing to store a reference to 
     */
    constructor(thing)
    {
        if (typeof thing == "string")
        {
            this.address = thing;
        }

        else
        {
            this.address = thing.address;
        }
    }

    resolve()
    {
        let [entityName, valueName] = this.address.split(":");

        let entity = sketch.getEntity(entityName);

        if (valueName == null)
        {
            return entity;
        }

        return entity.data[valueName];
    }

    /**
     * Same as resolve, but uses a map of all of the entities and data
     * @param {Map<string, Addressable>} map 
     */
    resolveMap(map)
    {
        return map.get(this.address);
    }

    get value()
    {
        return this.resolve().value;
    }

    isValid()
    {
        return this.resolve() != null;
    }

}