<script>

import {Point} from "../point.js";
import * as Viewport from "../../panels/Viewport.svelte";
import * as toolController from "../../controls/toolController.js";

/** @type {Point} */
export let entity;

let selected = entity.selected;
let hover = entity.hover;
let construction = entity.construction;

let pointSize = Viewport.pointSize;

function onClick(event)
{
    toolController.select(entity.address);

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


<use 
    class="point" 
    class:selected={$selected}
    class:hover={$hover}
    class:fully-constrained={entity.solved}
    href={$construction ? "#construction-point" : "#regular-point"}
    x={entity.x}
    y={entity.y}
    
></use>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<circle
    class="collision"
    cx={entity.x}
    cy={entity.y}
    r={$pointSize}

    style={`--point-size: var(--regular-point-size);`}

    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
/>

<style>
    .point {
        stroke-width: var(--point-stroke-size);
        stroke: var(--loose-point-color);
        fill: var(--loose-point-color);
        vector-effect: non-scaling-stroke;

    }

    .point.fully-constrained {
        stroke: var(--point-color);
        fill: var(--point-color);
    }

    .point.selected {
        stroke: var(--point-selected);
        fill: var(--point-selected);
        
    }

    .point.hover {
        stroke: var(--point-hover);
        fill: var(--point-hover);
    }

    .collision {
        /* fill: var(); */
        fill: var(--collision-overlay-color);
        fill-opacity: var(--collision-overlay-opacity);

        /* r: 1; */
        /* r: calc(var(--inverse-zoom) * var(--inverse-ppu) * var(--point-size)); */

        /* transform:  */
	        /* scale(var(--inverse-zoom)) Camera to World */
	        /* scale(var(--inverse-ppu)) World to Screen */
            /* scale(var(--point-size)) Convert point size to view space, scale it by that value */
	        ;

        stroke: none;
    }
</style>