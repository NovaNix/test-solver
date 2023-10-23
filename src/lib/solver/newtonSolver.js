import {Constraint, ConstraintFunction} from "../constraints/constraint.js"
import { FloatData, Ref } from "../entities/entity.js";

import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

/**
 * 
 * @param {ConstraintFunction[]} functions 
 * @param {Ref[]} unknowns 
 */
export function* newtonSolver(functions, unknowns)
{
    // Netwon's method works by procedurally adding delta values to the unknowns until the deltas for all elements are zero

    let solving = true;

    while (solving)
    {
        /** @type {number[][]} */
        let mat = [];

        // Calculate the Jacobian matrix
        // Height: number of functions
        // Width: number of unknowns

        for (let func of functions)
        {
            /** @type {number[]} */
            let row = [];

            for (let unknown of unknowns)
            {
                let d = func.solveDerivative(unknown.address);
                row.push(d);
            }

            mat.push(row);
        }

        // Calculate the function matrix (array of rows)
        /** @type {number[]} */
        let fmat = [];

        for (let func of functions)
        {
            fmat.push(-func.solve());
        }

        // Move the matrices into nerdamer

        let J = math.matrix(mat);
        let F = math.matrix(fmat);

        console.log("Jacobian Matrix: " + J.toString());
        console.log("Function Matrix: " + F.toString());

        let JInvert = math.pinv(J);

        // Calculate and apply the deltas
        let deltas = math.multiply(JInvert, F);
        console.log(`Deltas: ${deltas.toString()}`);

        let converged = true; // While we're looping through the deltas, we might as well check if we've converged

        for (let i = 0; i < unknowns.length; i++)
        {
            let deltaex = deltas.get([i]);

            console.log(`Delta ${unknowns[i].resolve().address}: ${deltaex}`)

            unknowns[i].resolve().value += deltaex;

            if (Math.abs(deltaex) > Number.EPSILON)
                converged = false;
        }

        // Check to see if converged
        if (converged)
        {
            console.log("Converged!");

            // Mark all of the unknowns as solved
            unknowns.forEach(x => x.resolve().solved = true);

            solving = false;
        }

        yield;
    }

    
}