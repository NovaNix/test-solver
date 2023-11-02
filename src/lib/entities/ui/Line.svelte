<script>
    import {Line} from "../line.js";
    import * as toolController from "../../controls/toolController.js";
    import Point from "./Point.svelte";

    /** @type {Line} */
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


<line 
    x1={entity.x1} 
    x2={entity.x2} 
    y1={entity.y1} 
    y2={entity.y2} 
    class="entity"
    class:construction={$construction}
    class:selected={$selected}
    class:hover={$hover}
    class:fully-constrained={entity.solved}
    />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<line
    class="collision"
    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
    on:mousemove={onMouseMove}
    on:mousedown={onMouseDown}
    on:mouseup={onMouseUp}
    x1={entity.x1} 
    x2={entity.x2} 
    y1={entity.y1} 
    y2={entity.y2}
/>
<Point entity={entity.p1}/>
<Point entity={entity.p2}/>



<style>

</style>