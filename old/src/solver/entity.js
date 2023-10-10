export class FloatData
{
    /** @type {number} */
    value;

    solved = false;

    constructor(value)
    {
        this.value = value;
    }
}

export class Entity
{
    construction = false;
    fixed = false;

    selected = false;

    /** @type {SVGElement} */
    svgNode;

    data;

    constructor()
    {
        this.svgNode = this.generateSVG();
        this.data = {};
    }

    generateSVG() {}

    updateSVG() {}

    setConstruction(value)
    {
        this.construction = value;
        this.updateSVG();
    }

    isConstruction()
    {
        return this.construction;
    }

}





export class Arc extends Entity
{

}