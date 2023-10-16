<script>
    import {Line} from "../line.js";
    import * as solver from "../../solver/solver.js";
    import Point from "./Point.svelte";

    /** @type {Line} */
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


<line 
    x1={entity.x1} 
    x2={entity.x2} 
    y1={entity.y1} 
    y2={entity.y2} 
    class="entity"
    class:construction={entity.construction}
    class:selected={$selected}
    class:hover={$hover}
    />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<line
    class="collision"
    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
    x1={entity.x1} 
    x2={entity.x2} 
    y1={entity.y1} 
    y2={entity.y2}
/>
<Point entity={entity.p1}/>
<Point entity={entity.p2}/>



<style>

</style>