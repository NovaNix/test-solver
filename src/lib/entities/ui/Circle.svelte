<script>
    import {Circle} from "../circle.js";
    import * as solver from "../../solver/solver.js";
    import Point from "./Point.svelte";

    /** @type {Circle} */
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

<!-- <path
    class="circle-element"
    class:construction={entity.construction}
    class:selected={$selected}
    class:hover={$hover}

    d={`
    M ${entity.x}, ${entity.y} 
    a ${entity.radius}, ${entity.radius} 0 1,0 (${entity.radius} * 2), 0 
    a ${entity.radius}, ${entity.radius} 0 1,0 -(${entity.radius} * 2),0
    `}

/> -->

<circle
    class="entity"
    class:construction={entity.construction}
    class:selected={$selected}
    class:hover={$hover}

    cx={entity.x}
    cy={entity.y}
    r={entity.radius}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<circle
    class="collision"
    class:construction={entity.construction}
    class:selected={$selected}
    class:hover={$hover}

    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}

    cx={entity.x}
    cy={entity.y}
    r={entity.radius}
/>



<style>
    /* .circle-element {
        fill: none;
        stroke: black;
        stroke-width: 2px;
    } */
</style>