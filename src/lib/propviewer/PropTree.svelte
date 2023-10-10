<script>
    import {sketch} from "../solver/solver.js"
    import EntityNode from "./EntityNode.svelte";

    // let sketch = ;
</script>

<div>
    <h1>Properties</h1>

    <details class="tree-container">
        <summary class="tree-cell">Entities</summary>

        {#each sketch.entities as entity}
        <EntityNode entity={entity}  />
        {/each}
    </details>

    <!-- Colored Background SVG -->
    

</div>

<style>
    
</style>