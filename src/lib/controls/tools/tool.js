import {Entity} from "../../entities/entity.js";

export class Tool 
{
    name;
    icon;

    constructor(name, icon)
    {
        this.name = name;
        this.icon = icon;
    }

    /**
     * @param {MouseEvent} event The event fired 
     * @param {[number, number]} pos The position of the click in world space
     * @param {?Entity} entity The entity that was clicked on (if any)
     */
    onLeftClick(event, pos, entity)
    {

    }

    /**
     * @param {MouseEvent} event The event fired 
     * @param {[number, number]} pos The position of the click in world space
     * @param {?Entity} entity The entity that was clicked on (if any)
     */
    onRightClick(event, pos, entity)
    {

    }

    /**
     * @param {MouseEvent} event The event fired 
     * @param {[number, number]} pos The position of the mouse in world space
     * @param {?Entity} entity The entity that was clicked on (if any)
     */
    onMouseDown(event, pos, entity)
    {

    }

    /**
     * @param {MouseEvent} event The event fired 
     * @param {[number, number]} pos The position of the mouse in world space
     * @param {?Entity} entity The entity that the click was released on (if any)
     */
    onMouseUp(event, pos, entity)
    {

    }

    
    /**
     * @param {MouseEvent} event The event fired 
     * @param {[number, number]} pos The position of the mouse in world space
     * @param {?Entity} entity The entity that the mouse is hovering over (if any)
     */
    onMouseMove(event, pos, entity)
    {

    }

    /**
     * @param {KeyboardEvent} event The event fired
     */
    onKeyPress(event)
    {

    }

    /**
     * @param {KeyboardEvent} event The event fired
     */
    onKeyRelease(event)
    {

    }
}