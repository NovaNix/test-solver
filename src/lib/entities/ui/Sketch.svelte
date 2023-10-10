<script context="module">
    
</script>

<script>
    import {Sketch} from "../../solver/solver.js"
    import Point from "./Point.svelte"

    const typeComponents = {
        "point": Point
    };

    /** @type {Sketch} */
    export let sketch;
</script>

<g>
    {#each sketch.entities as entity}
        <svelte:component entity={entity} this={typeComponents[entity.type]}></svelte:component>
    {/each}
</g>