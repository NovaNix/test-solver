import {Tool} from "./tool.js";
import * as ToolController from "../toolController.js";


let shiftDown = false;

let dragging = false;
let draggingEntity = null;
/** @type {?[number, number]} */
let dragStart = null;

export class SelectTool extends Tool
{
    constructor()
    {
        super("Select", "select");
    }

    onLeftClick(event, pos, entity)
    {
        if (event != null)
        {
            ToolController.select(entity.address);
        }

        else
        {
            ToolController.clearSelection();
        }
    }

    onMouseDown(event, pos, entity)
    {
        if (entity)
        {
            dragging = true;
            draggingEntity = entity;
            dragStart = pos;
        }
    }

    onMouseUp(event, pos, entity)
    {
        dragging = false;
        draggingEntity = null;
        dragStart = null;
    }

    onMouseMove(event, pos, entity)
    {
        updateDrag(pos);
    }
}

function updateDrag(pos)
{

}