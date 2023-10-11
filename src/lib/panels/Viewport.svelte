<script context="module">
	import { writable } from 'svelte/store';
	import { get } from 'svelte/store';

	import {onMouseWheel, onMouseClick, onMouseDown, onMouseUp, onMouseMove} from "../controls/viewportControls.js";
	
	const ppu = 90.0;

	const maxZoom = 2;

	let viewWidth = 0;
	let viewHeight = 0;

	const camera = writable({
		x: 0,
		y: 0,
		zoom: 0, // Zoom is NOT scale. It is a power of 2
	});

	// Camera Functions
	export function resetCamera()
	{
		camera.set({
			x: 0,
			y: 0,
			zoom: 0,
		});
	}

	export function translate(dx, dy)
	{
		let cam = get(camera);

		cam.x += dx;
		cam.y += dy;

		camera.set(cam);
	}

	export function setPosition(x, y)
	{
		let cam = get(camera);

		cam.x = x;
		cam.y = y;

		camera.set(cam);
	}

	export function zoom(amount)
	{
		let cam = get(camera);

		cam.zoom += amount;

		if (cam.zoom > maxZoom)
			cam.zoom = maxZoom;
		else if (cam.zoom < -maxZoom)
			cam.zoom = -maxZoom;

		camera.set(cam);
	}

	export function getPosition()
	{
		let cam = get(camera);

		return [cam.x, cam.y];
	}

	export function getZoom()
	{
		let cam = get(camera);

		return cam.zoom;
	}

	// Coordinate Space Functions
	// Screen: The size of the actual HTML Element (Could remove, kinda redundant with View)
	// World: The actual coordinate space of the sketch
	// Camera: The coordinate space relative to the camera
	// View: The coordinate space of the actual element (basically screen but with camera translations)

	export function screenToWorld(x, y)
	{
		let newX = (x - (viewWidth / 2.0)) / ppu;
		let newY = (y - (viewHeight / 2.0)) / ppu;

		return [newX, newY];
	}

	export function worldToScreen(x, y)
	{
		let newX = (x * ppu) + (viewWidth / 2.0);
		let newY = (y * ppu) + (viewHeight / 2.0);

		return [newX, newY];
	}

	export function worldToCamera(x, y)
	{
		let cam = get(camera);

		let newX = (x - cam.x) * Math.pow(2, cam.zoom);
		let newY = (y - cam.y) * Math.pow(2, cam.zoom);

		return [newX, newY];
	}

	export function cameraToWorld(x, y)
	{
		let cam = get(camera);

		let newX = (x / Math.pow(2, cam.zoom)) + cam.x;
		let newY = (y / Math.pow(2, cam.zoom)) + cam.y;

		return [newX, newY];
	}

	export function cameraToView(x, y)
	{
		return worldToScreen(x, y);
	}

	export function viewToCamera(x, y)
	{
		return screenToWorld(x, y);
	}

	export function cameraToScreen(x, y)
	{
		return worldToScreen(...cameraToWorld(x, y));
	}

	export function screenToCamera(x, y)
	{
		return worldToCamera(...screenToWorld(x, y));
	}

	export function viewToWorld(x, y)
	{
		return cameraToWorld(...viewToCamera(x, y));
	}



</script>

<script>
    import { onMount } from "svelte";
    import Sketch from "../entities/ui/Sketch.svelte";
	import {sketch} from "../solver/solver.js";
	import {Point} from "../entities/point.js";
    import { draw } from 'svelte/transition';

	let renderSpace;
	let canvas;
	let svg;

	function updateScale()
	{
		viewWidth = renderSpace.clientWidth;
		viewHeight = renderSpace.clientHeight;

		updateCamera($camera);

		canvas.width = renderSpace.clientWidth;
    	canvas.height = renderSpace.clientHeight;
		
    	svg.setAttribute('width', renderSpace.clientWidth);
    	svg.setAttribute('height', renderSpace.clientHeight);

		drawDebug();

    	//svg.setAttribute("viewBox", `${-(renderSpace.clientWidth / 2.0) / ppu} ${-(renderSpace.clientHeight / 2.0) / ppu} ${renderSpace.clientWidth / ppu} ${renderSpace.clientHeight / ppu}`)
	}

	function updateCamera(camera)
	{
		if (svg == null)
			return; // Not mounted yet

		// Set the viewbox to match the camera
		let topLeft = viewToWorld(0, 0);
		let bottomRight = viewToWorld(viewWidth, viewHeight);

		svg.setAttribute("viewBox", `${topLeft[0]} ${topLeft[1]} ${bottomRight[0] - topLeft[0]} ${bottomRight[1] - topLeft[1]}`);
	
		renderSpace.style.setProperty("--inverse-zoom", 1.0 / Math.pow(2, camera.zoom));
	}

	$: updateCamera($camera);

	onMount(() => {
		const resizeObserver = new ResizeObserver(updateScale);
		resizeObserver.observe(renderSpace);

		updateScale();

		
	});

	function drawDebug()
	{
		// // Draw Debugging Visuals
		// const ctx = canvas.getContext('2d');
		// // Draw a point at the center of the screen
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		// ctx.beginPath();
		// ctx.arc(canvas.width / 2.0, canvas.height / 2.0, 5, 0, 2 * Math.PI);
		// ctx.stroke();

	}

	function formatNumber(num)
	{
		return Number.parseFloat(num).toFixed(2);;
	}

	
</script>

<div id="renderSpace" bind:this={renderSpace} style:--ppu={ppu} style:--inverse-ppu={1.0 / ppu} >
	
	<svg id="svg" xmlns:xlink="http://www.w3.org/1999/xlink" bind:this={svg}>
		<defs>
			<pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
				<rect x=0 y=0 width="1" height="1"/>
				<path d="M 1 0 L 0 0 0 1 1 1 1 0" fill="none" />
			</pattern>
			<path id="regular-point" class="point-template" d="M -0.5 -0.5 H 0.5 V 0.5 H -0.5 Z"/>
			<path id="construction-point" class="point-template" d="M 0.5 0.5 L -0.5 -0.5 M 0.5 -0.5 L -0.5 0.5"/>
		</defs>
		<!-- TODO: Replace these kinda gross methods of having an infinite grid and axes with a better solution -->
		<rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#grid)" />
		<line x1="-1000" y1="0" x2="1000" y2="0" id="x-axis"/>
		<line x1="0" y1="-1000" x2="0" y2="1000" id="y-axis"/>

		<Sketch sketch={sketch}/>
	</svg>
	<canvas id="canvas" width="750" height="500" bind:this={canvas} on:click={onMouseClick} on:wheel={onMouseWheel} on:mousedown={onMouseDown} on:mouseup={onMouseUp} on:mousemove={onMouseMove}></canvas>
	<div id="camera-info">
		<p id="camera-zoom-text">{formatNumber(Math.pow(2, $camera.zoom))}x</p>
		<p id="camera-pos-text">{formatNumber($camera.x)}, {formatNumber($camera.y)}</p>
	</div>
</div>

<style>
	#renderSpace {
    	width: 100%;
    	height: 100%;
    	box-sizing: border-box;
    	position: relative;

    	grid-area: visual;	
	}

	#renderSpace> * {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    box-sizing: border-box;
	}

	svg {
	    width: 100%;
	}

	canvas {
	    z-index: 100;
	}

	#camera-info {
		position: absolute;
		top: auto;
		left: auto;
		bottom: 0;
		right: 0;
		color: white;
		padding: 5px;
		width: max-content;
		height: max-content;
	}

	#camera-info p {
		margin: 4px;
		font-size: 12px;
		text-align: center;
	}


</style>