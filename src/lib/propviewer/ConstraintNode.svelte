<script>
	import COINCIDENT_ICON from "../../assets/constraints/COINCIDENT.png";
	import EQUAL_ICON from "../../assets/constraints/EQUAL.png";
	import HORIZONTAL_ICON from "../../assets/constraints/HORIZONTAL.png";
	import VERTICAL_ICON from "../../assets/constraints/VERTICAL.png";
	import PARALLEL_ICON from "../../assets/constraints/PARALLEL.png";
	import PERPENDICULAR_ICON from "../../assets/constraints/PERPENDICULAR.png";
	import TANGENT_ICON from "../../assets/constraints/TANGENT.png";
	import MIDPOINT_ICON from "../../assets/constraints/MIDPOINT.png";

	import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

	import FunctionNode from "./FunctionNode.svelte";

	import {Constraint} from "../constraints/constraint.js";

	

	/** @type {Constraint} */
	export let constraint;
	export let depth = 0;

	const icons = {
		"coincident": COINCIDENT_ICON,
		"equal": EQUAL_ICON,
		"horizontal": HORIZONTAL_ICON,
		"vertical": VERTICAL_ICON,
		"parallel": PARALLEL_ICON,
		"perpendicular": PERPENDICULAR_ICON,
		"tangent": TANGENT_ICON,
		"midpoint": MIDPOINT_ICON
	}
</script>

<TreeNode depth={depth + 1}>
    <svelte:fragment slot="main">
        {#if icons[constraint.type]}
			<!-- <span class="icon entity-icon material-symbols-outlined">{icons[constraint.type]}</span> -->
			<img src={icons[constraint.type]} alt={constraint.type} class="constraint-icon"/>
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
					<FunctionNode depth={depth + 2} func={func}/>
				{/each}
			</svelte:fragment>
		</TreeNode>
    </svelte:fragment>
</TreeNode>

<style>
	.constraint-name {
		font-weight: bold;
	}

	p {
        /* display: inline-block; */
        line-height: 22px;
        height: 22px;
        vertical-align: middle;

        font-size: 11pt;
        color: #C3C3C3;
        margin: 0;

        /* font-family: ui-monospace; */
    }

	.constraint-icon {
		width: 20px;
		height: 20px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.solved-icon {
        color: lime;
        margin-left: auto;
    }
</style>