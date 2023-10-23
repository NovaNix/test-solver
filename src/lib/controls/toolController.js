import {Entity} from "../entities/entity.js"
import { writable, get } from 'svelte/store';
import { sketch } from "../solver/solver.js";

let drawTools = [];
let constrainTools = [];

export const SELECT_MODE_NEW = 0;
export const SELECT_MODE_ADD = 1;

/** @type {import("svelte/store").Writable<Entity[]>} */
export const selected = writable([]);
export let selectMode = SELECT_MODE_NEW;

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