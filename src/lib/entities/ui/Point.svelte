<script>

import {Point} from "../point.js";
import * as solver from "../../solver/solver.js";

/** @type {Point} */
export let entity;

let selected = entity.selected;
let hover = entity.hover;

function onClick(event)
{
    solver.select(entity.address);

    event.stopPropagation();
}

function onMouseEnter(event)
{
    $hover = true; 
}

function onMouseLeave(event)
{
    $hover = false;
}

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<use 
    class="point" 
    class:selected={$selected}
    class:hover={$hover}
    href={entity.construction ? "#construction-point" : "#regular-point"}
    x={entity.x}
    y={entity.y}
    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
></use>

<style>
    .point {
        stroke-width: var(--point-stroke-size);
        stroke: var(--point-color);
        fill: var(--point-color);
        vector-effect: non-scaling-stroke;

    }

    .point.selected {
        stroke: var(--point-selected);
        fill: var(--point-selected);
        
    }

    .point.hover {
        stroke: var(--point-hover);
        fill: var(--point-hover);
    }
</style>