export function distance(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

export function length(x1, y1)
{
    return Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
}

export function normalize(x, y)
{
    let l = length(x, y);
    return [x/l, y/l];
}

export function dot(x1, y1, x2, y2)
{
    return x1*x2 + y1*y2;
}