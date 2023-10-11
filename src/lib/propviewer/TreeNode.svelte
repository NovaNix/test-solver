<script>
	export let open = false; 
</script>

<slot name="main"></slot>
{#if open}
	<slot name="children"></slot>
{/if}

<style>
	.tree-cell {
		height: 22px;
		font-size: 11pt;
		color: #C3C3C3;
		margin: 0;
	}

	.tree-container > *:not(summary) {
		margin-left: 12px;
	}
</style>