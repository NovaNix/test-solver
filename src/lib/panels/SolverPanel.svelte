<script>
    import * as Viewport from "../panels/Viewport.svelte"
	import * as solver from "../solver/solver.js"
    import TreeNode from "../propviewer/tree/TreeNode.svelte";
    import TreeLeaf from "../propviewer/tree/TreeLeaf.svelte";
    import SimplePanel from "../propviewer/solver/SimplePanel.svelte";
    import ComplexPanel from "../propviewer/solver/ComplexPanel.svelte";

    // This is the store containing the state
    /** @type {Store<import("../solver/solver.js").SolverState>} */
    export let state;

    /** @type {Store<boolean>}*/
    let autoSolve = solver.autoSolve;

</script>


<TreeNode>
    <svelte:fragment slot="main">Solver</svelte:fragment>
    <svelte:fragment slot="children">
        <TreeLeaf depth={1}>Stage: {$state.stage}</TreeLeaf>
        {#if $state.completeTime}
        <TreeLeaf depth={1}>Solve Time: {$state.completeTime}ms</TreeLeaf>
        {/if}
    
        {#if $state.simple}
            <SimplePanel state={$state.simple} depth={1}/>
        {/if}
        {#if $state.solver}
            <ComplexPanel state={$state.solver} depth={1}/>
        {/if}
    
    </svelte:fragment>
</TreeNode>

<div>
    <button on:click={Viewport.resetCamera}>Reset Camera</button>
    <button on:click={solver.solveStepped}>Solve Step</button>
    <button on:click={solver.solveComplete}>Solve Complete</button>
    <div id="auto-solve-check">
        <input type="checkbox" bind:checked={$autoSolve} name="autoSolve"/>
        <label for="autoSolve">Auto Solve</label>
    </div>
     
</div>


<style>
    /* aside {
        background-color: white;
        height: max-content;
        width: max-content;
    } */

    label {
        color: white;
    }

    #auto-solve-check {
        display: block;
    }
</style>