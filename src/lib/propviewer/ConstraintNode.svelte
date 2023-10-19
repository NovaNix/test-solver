<script>
	import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

	import FunctionNode from "./FunctionNode.svelte";

	import {Constraint} from "../constraints/constraint.js";

	/** @type {Constraint} */
	export let constraint;
	export let depth = 0;

	const icons = {
		// "coincident": ""
	}
</script>

<TreeNode depth={depth + 1}>
    <svelte:fragment slot="main">
        {#if icons[constraint.type]}
			<span class="icon entity-icon material-symbols-outlined">{icons[constraint.type]}</span>
		{/if}
		<p class="constraint-name">{constraint.name}</p>
		{#if constraint.isMet()}
			<span class="solved-icon icon material-symbols-outlined">check_circle</span>
		{/if}
    </svelte:fragment>
    <svelte:fragment slot="children">
        <TextLeaf depth={depth + 2}><p>subtype: {constraint.subtype}</p></TextLeaf>
		
		<TreeNode depth={depth + 2}> 
			<svelte:fragment slot="main">
				<p>Functions</p>
			</svelte:fragment>
			<svelte:fragment slot="children">
				{#each constraint.functions as func}
					<FunctionNode depth={depth + 3} func={func}/>
				{/each}
			</svelte:fragment>
		</TreeNode>
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