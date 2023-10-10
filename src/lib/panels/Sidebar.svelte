<script>
	import PropTree from "../propviewer/PropTree.svelte"
</script>

<aside id="sidebar">
	<PropTree/>
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