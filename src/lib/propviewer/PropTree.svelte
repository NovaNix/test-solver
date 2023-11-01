<script>
    import {sketch} from "../solver/solver.js"
    import EntityNode from "./scene/EntityNode.svelte";
    import TreeNode from "./tree/TreeNode.svelte";
    import ConstraintNode from "./scene/ConstraintNode.svelte";
    import SolverPanel from "../panels/SolverPanel.svelte";
    import * as solver from "../solver/solver.js"

    let entities = sketch.entities;
    let constraints = sketch.constraints;

    // let sketch = ;
</script>

<h1>Properties</h1>
<div id="prop-tree">
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
        <SolverPanel state={solver.solverState}/>
    </div>
</div>

<style>
    h1 {
        text-align: center;
        color: white;
        padding: 0;
        margin: 5px;

    }

    #prop-tree {
        position: relative;
        min-height: 50%;
        /* min-width: max-content; */
        width: 100%;

        overflow-y: auto;
        overflow-x: auto;
    }

    .tree {
        display: flex;
        flex-direction: column;
        min-width:100%;
        width:fit-content;

    }


</style>