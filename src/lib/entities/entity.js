export class DataType
{

}

export class FloatData extends DataType
{
    /** @type {number} */
    value;

    solved = false;

    constructor(value)
    {
        super();
        this.value = value;
    }
}

export class Entity
{
    name;
    type;

    construction = false;
    fixed = false;

    selected = false;

    data;

    constructor(name, type)
    {
        this.name = name;
        this.type = type;
        
        this.data = {};
    }

}
