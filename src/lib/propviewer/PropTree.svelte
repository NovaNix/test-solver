<script>
    import {sketch} from "../solver/solver.js"
    import EntityNode from "./EntityNode.svelte";
    import TreeNode from "./tree/TreeNode.svelte";
    import ConstraintNode from "./ConstraintNode.svelte";

    let entities = sketch.entities;
    let constraints = sketch.constraints;

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
        <TreeNode>
            <svelte:fragment slot="main">Constraints</svelte:fragment>
            <svelte:fragment slot="children">
                {#each $constraints as constraint}
                <ConstraintNode constraint={constraint}  />
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