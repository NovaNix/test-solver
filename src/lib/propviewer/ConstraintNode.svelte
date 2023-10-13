<script>
	import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

	export let constraint;
	export let depth = 0;

	// let selected = constraint.selected;
	// let hover = constraint.hover;

	// function onClick(event)
	// {
	// 	solver.select(constraint.address);

	// 	event.stopPropagation();
	// }

	// function onMouseEnter(event)
	// {
	// 	$hover = true; 
	// }

	// function onMouseLeave(event)
	// {
	// 	$hover = false;
	// }

	const icons = {
		"coincident": ""
	}
</script>

<TreeNode 
depth={depth + 1} 
>
    <svelte:fragment slot="main">
        <span class="icon entity-icon material-symbols-outlined">{icons[entity.type]}</span><p class="entity-name">{entity.name}</p>
    </svelte:fragment>
    <svelte:fragment slot="children">
        {#each Object.entries(entity.data) as [name, data]}
            {#if data instanceof Entity}
                <svelte:self depth={depth + 1} entity={data}/>
            {:else}
                <TextLeaf depth={depth + 2}><p>{name}: {data.value}</p></TextLeaf>
            {/if}
            
        {/each}

        <TextLeaf depth={depth + 2}><p>fixed: {entity.fixed}</p></TextLeaf>
        <TextLeaf depth={depth + 2}><p>construction: {entity.construction}</p></TextLeaf>
    </svelte:fragment>
</TreeNode>