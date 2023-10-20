<script>
	import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

	import {ConstraintFunction, GenericCFunction} from "../constraints/constraint.js";
    import Equation from "../utils/Equation.svelte";
    import TreeLeaf from "./tree/TreeLeaf.svelte";

	/** @type {ConstraintFunction} */
	export let func;
	export let depth = 0;

	let equation = null;
	let derivativeFunctions = [];

	function updateEquation()
	{
		if (func instanceof GenericCFunction)
		{
			equation = func.getLatex();

			derivativeFunctions = [];

			for (const [key, value] of Object.entries(func.derivatives))
			{
				derivativeFunctions.push(`\\frac{\\partial f}{\\partial ${key}} = ${value.toTex()}`)
			}
		}

		else
		{
			equation = null;
		}
	}

	$: updateEquation();

	const icons = {
		// "coincident": ""
	}
</script>

<TreeNode depth={depth + 1}>
    <svelte:fragment slot="main">
		{#if !equation}
			{func.constructor.name}
		{:else}
		<Equation latex={equation}/><span>&nbsp;=&nbsp;{func.solve().toFixed(4)}</span>
			
		{/if}
		
		{#if func.isMet()}
			<span class="solved-icon icon material-symbols-outlined">check_circle</span>
		{/if}
    </svelte:fragment>
    <svelte:fragment slot="children">
		{#each derivativeFunctions as derivative}
			<TreeLeaf depth={depth+2}><Equation latex={derivative}/></TreeLeaf>
		{/each}
    </svelte:fragment>
</TreeNode>

<style>
	.constraint-name {
		font-weight: bold;
	}

	.solved-icon {
        color: lime;
        margin-left: auto;
    }
</style>