<script>
	import PropTree from "../propviewer/PropTree.svelte"
	import * as Viewport from "../panels/Viewport.svelte"
</script>

<aside id="sidebar">
	<PropTree/>
	<button on:click={Viewport.resetCamera}>Reset Camera</button>
</aside>

<style>
	#sidebar {
    	grid-area: sidebar;
    	min-width: 30%;

    	/* overflow: auto; */

    	background-color: #303030;
		padding: 5px;
    	/* resize: horizontal; */
	}
</style>