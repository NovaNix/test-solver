import {Tool} from "./tool.js";

let shiftDown = false;

export class SelectTool extends Tool
{
    constructor()
    {
        super("Select", "select");
    }
}