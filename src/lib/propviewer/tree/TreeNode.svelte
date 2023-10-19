<script>
	export let open = false; 

	export let selected = false;
	export let hover = false;

	export let depth = 0; // The depth of the node, where 0 is the top of the tree. Used for the offset

	function toggleOpen(event)
	{
		open = !open;

		event.stopPropagation(); // Prevent clicking on the button below this one
	}

</script>

<button class="tree-cell" 
	class:selected={selected}
	class:hover={hover}
	style:--tree-depth={depth} 
	on:click
	on:mouseenter
    on:mouseleave
	>
	{#if $$slots.children}
		<button class="dropdown-button" on:click={toggleOpen}>
			{#if open}
				<span class="icon material-symbols-outlined">keyboard_arrow_down</span>
			{:else}
				<span class="icon material-symbols-outlined">keyboard_arrow_right</span>
			{/if}
		</button>
		
	{/if}
	<slot name="main"></slot>

</button>
{#if open}
	<slot name="children" depth={depth + 1}></slot>
{/if}

<style>
	
	.dropdown-button {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0;
	}

	.tree-cell {
		font-family: inherit;
	}

	.tree-cell.selected {
		background-color: var(--tree-selected-color) !important;
	}

	.tree-cell.hover {
		filter: brightness(2);
	}
	/* .tree-container > *:not(summary) {
		margin-left: 12px;
	} */
</style>