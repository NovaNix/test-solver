<script>

import {Point} from "../point.js";

/** @type {Point} */
export let entity;

</script>

<use class="point" 
    href={entity.construction ? "#construction-point" : "#regular-point"}
    x={entity.x}
    y={entity.y}
></use>

<style>
    .point {
        stroke-width: var(--point-stroke-size);
        stroke: var(--point-color);
        fill: var(--point-color);
        vector-effect: non-scaling-stroke;

    }

    .point.selected {
        stroke: var(--point-selected)
    }
</style>