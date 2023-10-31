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

</script>

<aside>
    <TreeNode>
        <svelte:fragment slot="main">Solver</svelte:fragment>
        <svelte:fragment slot="children">
            <TreeLeaf depth={1}>Stage: {$state.stage}</TreeLeaf>
        
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
    </div>
</aside>

<style>
    /* aside {
        background-color: white;
        height: max-content;
        width: max-content;
    } */
</style>