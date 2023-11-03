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
            startDrag(entity, pos);
        }
    }

    onMouseUp(event, pos, entity)
    {
        endDrag();
    }

    onMouseMove(event, pos, entity)
    {
        updateDrag(pos);
    }
}

function startDrag(entity, pos)
{
    dragging = true;
    draggingEntity = entity;
    dragStart = pos;
}

function updateDrag(pos)
{

}

function endDrag()
{
    if (dragging)
    {
        
    }

    dragging = false;
    draggingEntity = null;
    dragStart = null;
}