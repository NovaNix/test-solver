<script>
    import {Line} from "../line.js";
    
    /** @type {Line} */
    export let entity;
    
</script>

<line x1={entity.x1} x2={entity.x2} y1={entity.y1} y2={entity.y2} class:construction={entity.construction}></line>

<style>
    line {
        stroke: var(--entity-color);
        stroke-width: var(--line-thickness);
    }

    line.construction {
        stroke-dasharray: 5;
        /* stroke: var(--construction-color); */
        stroke-opacity: var(--construction-opacity);
    }
</style>