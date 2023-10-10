<div id="renderSpace">
	<canvas id="canvas" width="750" height="500"></canvas>
	<svg id="svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
				<rect x=0 y=0 width="1" height="1"/>
				<path d="M 1 0 L 0 0 0 1 1 1 1 0" fill="none" />
			</pattern>
			<path id="regular-point" class="point-template" d="M -0.5 -0.5 H 0.5 V 0.5 H -0.5 Z"/>
			<path id="construction-point" class="point-template" d="M 0.5 0.5 L -0.5 -0.5 M 0.5 -0.5 L -0.5 0.5"/>
		</defs>
		
		<rect x="-50%" y="-50%" width="100%" height="100%" fill="url(#grid)" />
		<line x1="-1000" y1="0" x2="1000" y2="0" id="x-axis"/>
		<line x1="0" y1="-1000" x2="0" y2="1000" id="y-axis"/>
	</svg>
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
</style>