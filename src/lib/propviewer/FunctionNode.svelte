<script>
	import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

	import {ConstraintFunction, GenericCFunction} from "../constraints/constraint.js";

	/** @type {ConstraintFunction} */
	export let func;
	export let depth = 0;

	let equation = null;

	function updateEquation()
	{
		if (func instanceof GenericCFunction)
		{
			equation = func.func.toString();
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
			{equation}
		{/if}
		
		{#if func.isMet()}
			<span class="solved-icon icon material-symbols-outlined">check_circle</span>
		{/if}
    </svelte:fragment>
    <svelte:fragment slot="children">
        <!-- <TextLeaf depth={depth + 2}><p>subtype: {constraint.subtype}</p></TextLeaf> -->
		<!-- <TextLeaf depth={depth + 2}></TextLeaf> -->
        <!-- <TextLeaf depth={depth + 2}><p>fixed: {entity.fixed}</p></TextLeaf> -->
        <!-- <TextLeaf depth={depth + 2}><p>construction: {entity.construction}</p></TextLeaf> -->
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