<script>
    import Equation from "../../utils/Equation.svelte";
    import TreeNode from "../tree/TreeNode.svelte";
    import TreeLeaf from "../tree/TreeLeaf.svelte";

    /** @type {import("../../solver/newtonSolver.js").NewtonSolverDebugInfo}*/
    export let state;
    export let depth = 0;
</script>

<TreeNode depth={depth}>
    <svelte:fragment slot="main">Solver</svelte:fragment>
    <svelte:fragment slot="children">
        <TreeLeaf depth={depth + 1}>Iterations: {state.iteration}</TreeLeaf>
        
        <TreeLeaf depth={depth + 1}>Jacobian: <Equation latex={state.jacobianMat.toArray()} matrix=true/></TreeLeaf>
        <TreeLeaf depth={depth + 1}>Function Mat: <Equation latex={state.functionMat.toArray()} matrix=true/></TreeLeaf>
    
        <TreeNode depth={depth + 1}>
            <svelte:fragment slot="main">Deltas</svelte:fragment>
            <svelte:fragment slot="children">
                {#each Object.entries(state.deltas) as [name, value]}
                    <TreeLeaf depth={depth + 2}><span title={value.delta}>{name}: {value.delta.toFixed(4)}</span></TreeLeaf>
                {/each}
            </svelte:fragment>
        </TreeNode>
    </svelte:fragment>
</TreeNode>

