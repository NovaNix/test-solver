# Test-Solver
This is my first attempt at writing a 2D sketch constraint solver. 

This implementation is flawed and will likely be replaced in the future.

The solver works by representing all of the constraints as mathematical functions. They are then fed into an optimization algorithm, which attempts to reduce their error to zero. 

This approach is flawed, as it slows down with many constraints, cannot detect overconstrained sketches, and has dead zones where the algorithm cannot adjust the sketch. 

Additionally, doing a project like this in Javascript is not ideal. There are many helpful libraries for doing the math necessary in Javascript, however the structure of the program suffered. Additionally, while Svelte is helpful for the UI, I believe more time was spent writing the graphics code than the actual solver code. In the future, this project will be recoded in a strongly typed language.

If you need to test it, you can run it like any other Svelte program.
```
npm install
npm run dev
```