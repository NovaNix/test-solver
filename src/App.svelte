<script>
    import Sidebar from "./lib/panels/Sidebar.svelte";
    import Viewport from "./lib/panels/Viewport.svelte";


</script>

<main id="container">

	<Viewport />
	<Sidebar />
	
</main>

<style>
	main {
		height: 100%;
	}

	#container {
    	display: grid; 
    	grid-template-columns: 3fr 1fr; 
    	/* grid-template-columns: 3fr max-content;  */
    	grid-template-rows: 1fr; 
    	gap: 0px 0px; 
    	grid-template-areas: 
    	  "visual sidebar"; 
	}
</style>
