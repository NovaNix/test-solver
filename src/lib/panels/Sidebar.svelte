<script>
	import PropTree from "../propviewer/PropTree.svelte"
	import * as Viewport from "../panels/Viewport.svelte"
	import * as solver from "../solver/solver.js"
</script>

<aside id="sidebar">
	<PropTree/>
	<button on:click={Viewport.resetCamera}>Reset Camera</button>
	<button on:click={solver.solveStepped}>Solve Step</button>
</aside>

<style>
	#sidebar {
    	grid-area: sidebar;
    	min-width: 30%;

    	overflow: auto;

    	background-color: var(--sidebar-color);
		padding: 5px;
    	/* resize: horizontal; */
	}
</style>