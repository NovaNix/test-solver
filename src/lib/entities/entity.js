import { writable } from 'svelte/store';
import {sketch} from "../solver/solver.js";
import {VStore, LockableVStore} from "../utils/vstore"

/**
 * @typedef Addressable
 * @property {string} address
 * @property value
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

    /** @type {number[]} */
    potentialValues;

    /**
     * 
     * @param {Entity} parent The entity this data belongs to
     * @param {string} name The name of the data
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
    }

    get solved()
    {
        if (this.#fixed)
            return true;

        return this.#solved;
    }

    set solved(value)
    {
        this.#solved = value;
    }

    clearSolveInfo()
    {
        this.solved = false;
        this.potentialValues = null;
    }
}

/**
 * @implements {Addressable}
 */
export class Entity
{
    // The parent entity of this entity. If this is a top-level entity, this will be null
    /** @type {Entity | null} */
    #parent;

    name;
    type;

    construction = new LockableVStore(false, null, true);
    fixed = new LockableVStore(false, null, true);

    // These two are for the UI
    selected = new VStore(false);
    hover = new VStore(false);

    /**
     * An object containing all of the relevant data for this entity. This includes both FloatData and other Entities
     * @type {Object.<string, FloatData|Entity>}
     */
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

    get parent()
    {
        return this.#parent;
    }

    set parent(value)
    {
        this.#parent = value;

        if (this.#parent == null)
        {
            this.construction.setLockSource(null);
            this.fixed.setLockSource(null);
        }

        else
        {
            this.construction.setLockSource(this.#parent.construction);
            this.fixed.setLockSource(this.#parent.fixed);
        }
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

    set solved(value)
    {
        Object.values(this.data).forEach(x => x.solved = value);
    }

    get solved()
    {
        return Object.values(this.data).every(value => value.solved);
    }

    get value()
    {
        return "ERROR";
    }

    /**
     * Clears all of the previous solve info for all of this entity's data
     */
    clearSolveInfo()
    {
        this.solved = false;

        for (let value of Object.values(this.data))
        {
            value.clearSolveInfo();
        }
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

    /**
     * @returns {Addressable | any}
     */
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

    get value()
    {
        // @ts-ignore
        return this.resolve().value;
    }

    isValid()
    {
        return this.resolve() != null;
    }

    toString()
    {
        return this.address;
    }

}