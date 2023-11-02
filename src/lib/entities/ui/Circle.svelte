<script>
    import {Circle} from "../circle.js";
    import * as solver from "../../solver/solver.js";
    import Point from "./Point.svelte";
    import * as toolController from "../../controls/toolController.js";

    /** @type {Circle} */
    export let entity;

    let selected = entity.selected;
    let hover = entity.hover;
    let construction = entity.construction;

    function onClick(event)
    {
        if (event.button == 0)
            toolController.onLeftClick(event, entity);
        else if (event.button == 2)
            toolController.onRightClick(event, entity);

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

    function onMouseMove(event)
    {
        toolController.onMouseMove(event, entity);

        event.stopPropagation();
    }

    function onMouseDown(event)
    {
        toolController.onMouseDown(event, entity);

        event.stopPropagation();
    }

    function onMouseUp(event)
    {
        toolController.onMouseUp(event, entity);

        event.stopPropagation();
    }
</script>

<circle
    class="entity"
    class:construction={$construction}
    class:selected={$selected}
    class:hover={$hover}
    class:fully-constrained={entity.solved}

    cx={entity.x}
    cy={entity.y}
    r={entity.radius}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<circle
    class="collision"
    class:selected={$selected}
    class:hover={$hover}

    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
    on:mousemove={onMouseMove}
    on:mousedown={onMouseDown}
    on:mouseup={onMouseUp}

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