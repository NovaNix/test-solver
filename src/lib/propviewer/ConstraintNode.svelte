<script>
	import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

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
        {#if icons[constraint.type]}<span class="icon entity-icon material-symbols-outlined">{icons[constraint.type]}</span>{/if}
		<p class="constraint-name">{constraint.name}</p>
    </svelte:fragment>
    <svelte:fragment slot="children">
        <TextLeaf depth={depth + 2}><p>subtype: {constraint.subtype}</p></TextLeaf>
		<!-- <TextLeaf depth={depth + 2}></TextLeaf> -->
        <!-- <TextLeaf depth={depth + 2}><p>fixed: {entity.fixed}</p></TextLeaf> -->
        <!-- <TextLeaf depth={depth + 2}><p>construction: {entity.construction}</p></TextLeaf> -->
    </svelte:fragment>
</TreeNode>