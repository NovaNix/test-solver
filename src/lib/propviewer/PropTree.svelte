<script>
    import {sketch} from "../solver/solver.js"
    import EntityNode from "./EntityNode.svelte";

    let entities = sketch.entities;

    // let sketch = ;
</script>

<h1>Properties</h1>
<div>
    
    <!-- Colored Background SVG -->
    <svg>
        <defs>
            <pattern id="tree-slots" width="22" height="44" patternUnits="userSpaceOnUse">
                <!-- <rect x="0" y="0" width="22" height="22" fill="#333" /> -->
                <rect x="0" y="22" width="22" height="22" fill="#FFFFFF" opacity="0.015686" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tree-slots)" />


    </svg>

    <details class="tree-container">
        <summary class="tree-cell">Entities</summary>

        {#each $entities as entity}
        <EntityNode entity={entity}  />
        {/each}
    </details>

    <details class="tree-container">
        <summary class="tree-cell">Constraints</summary>

        <!-- {#each sketch.entities as entity}
        <EntityNode entity={entity}  />
        {/each} -->
    </details>



</div>

<style>
    h1 {
        text-align: center;
        color: white;
        padding: 0;
        margin: 5px;

    }

    div {
        position: relative;
        height: 80%;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        /* z-index: -1; */
    }
</style>