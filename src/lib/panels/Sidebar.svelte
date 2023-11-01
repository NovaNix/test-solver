<script>
	import PropTree from "../propviewer/PropTree.svelte"

    import SolverPanel from "./SolverPanel.svelte";
	import * as solver from "../solver/solver.js"

</script>

<aside id="sidebar">
	<PropTree/>
	<!-- <SolverPanel state={solver.solverState}/> -->

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