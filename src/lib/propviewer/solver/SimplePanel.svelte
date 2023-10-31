<script>
    import FunctionNode from "../FunctionNode.svelte";
    import TreeNode from "../tree/TreeNode.svelte";
    import TreeLeaf from "../tree/TreeLeaf.svelte";

    export let state;
    export let depth = 0;
</script>

<TreeNode depth={depth}>
    <svelte:fragment slot="main">Simple Solver</svelte:fragment>
    <svelte:fragment slot="children">
        <TreeLeaf depth={depth + 1}>Iterations: {state.iterations}</TreeLeaf>
        <TreeNode depth={depth + 1}>
            <svelte:fragment slot="main">Solved Functions</svelte:fragment>
            <svelte:fragment slot="children">
                {#each state.solvedFunctions as func}
                    <FunctionNode depth={depth + 2} func={func}/>
                {/each}
            </svelte:fragment>
        </TreeNode>
    </svelte:fragment>
</TreeNode>