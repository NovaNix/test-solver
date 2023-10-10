import {Entity, FloatData} from "../entity.js"

export class Point extends Entity
{
    /** @type {FloatData} */
    x;
    /** @type {FloatData} */
    y;

    constructor(x, y)
    {
        super();
        this.x = new FloatData(x);
        this.y = new FloatData(y);

        this.data = {
            x: this.x,
            y: this.y
        };

        this.updateSVG();
    }

    generateSVG()
    {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "use");
        circle.classList.add("point")
        return circle;
    }

    updateSVG()
    {
        if (this.isConstruction())
        {
            this.svgNode.setAttribute("href", "#construction-point")
        }
        else
        {
            this.svgNode.setAttribute("href", "#regular-point")
        }

        this.svgNode.setAttribute("x", this.x.value);
        this.svgNode.setAttribute("y", this.y.value);
    }
}