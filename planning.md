each constraint stores a value making it as rigid or non-rigid (non-rigid constraints can be skipped if they fail. theyre used for user dragging elements)
each constraint stores a value marking it as solved or unsolved

each constraint stores the constraint as a function, and it's derivative
each constraint also stores an array of pointers to all of the information it acts on (along with what components of points it uses, such as x, y, or both)
each constraint also has functions solving for a single point of information if all of the other bits of information are known

each point's x and y coordinate are objects containing if they are solved or not. 
each point contains if it is solved or not

each element contains if it is fixed or not

# Solving Process
All constraints are marked as unsolved. 

## Step 1: Simple Constraints
Using fixed elements as a starting point, constraint functions with a single missing value are found. 
The missing value is solved for using the known values. 

If some constraints are solved, if necessary some constraints can be simplified. 
For example, the following constraints between line `l1` and line `l2` can be simplified from
1. l1 is horizontal
2. l1 and l2 are parallel

to 

1. l1 is horizontal
2. l2 is horizontal

This is repeated until all constraints are solved, a constraint fails (two constraints have conflicting information), or until there are no constraints with only one missing value 

## Step 2: Euler's Method
The remaining constraints are solved using Euler's method


# Entities

## Point
- float x
- float y

## Line 
- vec2 start
- vec2 end

### Derived
- float length = distance(start, end)
- vec2 dir = normalize(end - start)
- vec2 root = start

## Circle
- vec2 center
- float radius

### Derived
- float length = 2 * pi * radius

# Constraint Functions
For simplicity, constraints could be split between being `simple` and `compound`, where simple constraints are purely mathematical, while compound constraints are multiple constraints mixed together

## Horizontal (point p1, point p2)
p1.y = p2.y

## Vertical (point p1, point p2)
p1.x = p2.x

## Distance Horizontal (point p1, point p2, float d)

abs(p1.x - p2.x) = d 

## Distance Vertical (point p1, point p2, float d)

abs(p1.y - p2.y) = d 

## Distance (point p1, point p2, float d)

distance(p1, p2) = d

## Parallel (line l1, line l2)

abs(dot(l1.vec, l2.vec)) = 1 

## Perpendicular (line l1, line l2)

abs(dot(l1.vec, l2.vec)) = 0

## Concentric (carc c1, carc c2)

c1.center = c2.center

## Equal Length (element e1, element e2)

e1.length = e2.length

## Coincident Points (point p1, point p2)

p1 = p2

## Coincident Point + CArc (point p1, carc c1)

distance(p1, c1.center) = c1.radius

## Colinear Point + Line (point p1, line l1)

p1 = (distance(p1, l1.root) * l1.dir) + l1.root

## Colinear Lines (line l1, line l2)
l1 parallel with l2
l1.root colinear with l2 && l2.root colinear with l1

## Midpoint (lineseg l1, point p1)

p1 = (l1.p1 + l1.p2) / 2


## Inequality Constraint
maybe look at https://www.stat.cmu.edu/~ryantibs/convexopt-F15/scribes/15-barr-method-scribed.pdf

a <= b
becomes a function that returns b-a if a > b, and 0 if a <= b
the derivative works the same way. 0 if a <= b, f'(a,b)=b-a otherwise