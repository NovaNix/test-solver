import * as Viewport from "../panels/Viewport.svelte";
import {sketch} from "../solver/solver.js";
import {Point} from "../entities/point.js";

/** @param {WheelEvent} event */
export function onMouseWheel(event)
{
	event.preventDefault();

	if (viewDragging)
		return; // You cant zoom while dragging!

	let zoom = event.deltaY * -0.005;

	Viewport.zoom(zoom);

	console.log("Zooming by " + zoom);

	console.log("Mouse Wheel");
}

let createdPoints = 0;

/** @param {MouseEvent} event */
export function onMouseClick(event)
{
	if (event.button == 0) // Left Click
	{
		let [x, y] = Viewport.viewToWorld(event.clientX, event.clientY);

		sketch.addEntity(new Point("Point " + createdPoints, x, y));

		createdPoints++;
	}
}

// Screen Drag Code

let viewDragging = false;
let startMouse = [0, 0]; // The mouse position when the drag started. 

let startPos = [0, 0]; // The camera position (in world space) when the drag started

/** @param {MouseEvent} event */
export function onMouseDown(event)
{
	if (event.button == 1) // Middle Click
	{
		viewDragging = true;
		startMouse = [event.clientX, event.clientY];
		startPos = Viewport.getPosition();
	}
}

/** @param {MouseEvent} event */
export function onMouseUp(event)
{
	if (event.button == 1) // Middle Click
	{
		viewDragging = false;
	}
}

/** @param {MouseEvent} event */
export function onMouseMove(event)
{
	let cameraPos = Viewport.getPosition();
	let cameraZoom = Viewport.getZoom(); 

	let cameraMouse = Viewport.viewToCamera(event.clientX, event.clientY) 
	let worldMouse = Viewport.viewToWorld(event.clientX, event.clientY);

	console.log(`Camera Pos: ${cameraPos[0]}, ${cameraPos[1]}`);
	console.log(`Camera Zoom: ${cameraZoom}`);

	console.log(`Mouse Pos:
	(View): ${event.clientX}, ${event.clientY}
	(Camera): ${cameraMouse[0]}, ${cameraMouse[1]}
	(World): ${worldMouse[0]}, ${worldMouse[1]}
	`)

	if (viewDragging)
	{
		let [x, y] = Viewport.viewToWorld(event.clientX, event.clientY);
		let [x1, y1] = Viewport.viewToWorld(startMouse[0], startMouse[1]);

		let dx = x - x1;
		let dy = y - y1;

		Viewport.setPosition(startPos[0] - dx, startPos[1] - dy);
	}
}

