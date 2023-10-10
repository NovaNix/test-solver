let ppu = 90.0; // 90 Pixels = 1 Unit

let camera = {
    x: 0.0,
    y: 0.0,
    zoom: 1.0
}

// Coordinate Spaces:
// Screen: (Top Left: 0, 0, Bottom Right: 100%, 100%): No transform
// World: screen.scale(ppu, -ppu)
// View: 

/** @type {HTMLCanvasElement} */
export const renderSpace = document.getElementById('renderSpace');
export const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const svg = document.getElementById("svg");

updateScale()

function updateScale()
{
    let xScale = (renderSpace.clientWidth) / ppu;
    let yScale = (renderSpace.clientHeight) / ppu;
    renderSpace.style.setProperty('--view-scale', 1.0 / Math.max(xScale, yScale));

    canvas.width = renderSpace.clientWidth;
    canvas.height = renderSpace.clientHeight;
    
    svg.setAttribute('width', renderSpace.clientWidth);
    svg.setAttribute('height', renderSpace.clientHeight);

    svg.setAttribute("viewBox", `${-(renderSpace.clientWidth / 2.0) / ppu} ${-(renderSpace.clientHeight / 2.0) / ppu} ${renderSpace.clientWidth / ppu} ${renderSpace.clientHeight / ppu}`)
}

// Update canvas size when renderSpace is resized
new ResizeObserver(updateScale).observe(renderSpace);

export function addEntity(entity)
{
    svg.appendChild(entity.svgNode);
}

export function removeEntity(entity)
{
    svg.removeChild(entity.svgNode);
}