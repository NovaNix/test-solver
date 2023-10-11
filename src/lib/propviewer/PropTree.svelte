<script>
    import {sketch} from "../solver/solver.js"
    import EntityNode from "./EntityNode.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

    let entities = sketch.entities;

    // let sketch = ;
</script>

<h1>Properties</h1>
<div>

    <div class="tree">
        <TreeNode>
            <svelte:fragment slot="main">Entities</svelte:fragment>
            <svelte:fragment slot="children">
                {#each $entities as entity}
                <EntityNode entity={entity}  />
                {/each}
            </svelte:fragment>
        
        </TreeNode>
    </div>

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

    .tree {
        display: flex;
        flex-direction: column;

    }


</style>