- redo entity rendering
- redo entity collisions
- move sketch class
- add entity dragging

- give each entity (besides points) a parametric function with a derivative
-- line: 
x: p1.x + (p2.x - p1.x)t
y: p1.y + (p2.y - p1.y)t
-- circle:
x: r * cos(2pi * t)
y: r * sin(2pi * t)

- add splines
- add arcs
- add cocentric constraints

- add point linking? (reduce the number of unknown variables by merging coindicent points)

- add zone finding (manifold sections of sketches)
- add zone operations (union)
- add zone rendering

- add inherent constraints
- add entity internal constraints

- fix value node to update references