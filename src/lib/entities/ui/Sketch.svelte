<script context="module">
    const typeComponents = {
        "point": Point
    };
</script>

<script>
    import {Sketch} from "../../solver/solver.js"
    import Point from "./Point.svelte"



    /** @type {Sketch} */
    export let sketch;

    let entities = sketch.entities;
</script>

<g>
    {#each $entities as entity}
        <svelte:component entity={entity} this={typeComponents[entity.type]}></svelte:component>
    {/each}
</g>