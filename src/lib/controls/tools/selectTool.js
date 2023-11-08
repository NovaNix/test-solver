import {Tool} from "./tool.js";
import * as ToolController from "../toolController.js";
import {sketch, requestSolve} from "../../solver/solver.js"
import {Point} from "../../entities/point.js";
import { CoincidentPoints, CoincidentPointCircle } from "../../constraints/coincident.js";
import { ColinearPoint } from "../../constraints/lines.js";

let shiftDown = false;

let dragging = false;
let draggingEntity = null;
/** @type {?[number, number]} */
let dragStart = null;

let dragPoint = null;
let dragConstraint = null;

export class SelectTool extends Tool
{
    constructor()
    {
        super("Select", "select");
    }

    onLeftClick(event, pos, entity)
    {
        if (entity != null)
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

    dragPoint = new Point("!dragpoint", pos[0], pos[1]);
    dragPoint.fixed.set(true);

    sketch.addTempEntity(dragPoint);

    switch (entity.type)
    {
        case "point":
            dragConstraint = new CoincidentPoints("!dragconstraint", entity, dragPoint);
            break;
        case "line":
            dragConstraint = new ColinearPoint("!dragconstraint", dragPoint, entity);
            break;
        case "circle":
            dragConstraint = new CoincidentPointCircle("!dragconstraint", dragPoint, entity);
            break;
    }

    sketch.addTempConstraint(dragConstraint);
}

function updateDrag(pos)
{
    if (!dragging)
        return;

    if (!dragConstraint)
    {
        console.error("No drag constraint!");
        return;
    }
        
    dragPoint.set(pos[0], pos[1]);
    requestSolve();
}

function endDrag()
{
    if (dragging)
    {
        sketch.removeTempConstraints();
        sketch.removeTempEntities();
    }

    dragging = false;
    draggingEntity = null;
    dragStart = null;
    dragConstraint = null;
}