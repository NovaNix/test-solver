import nerdamer from "nerdamer/all.min";

/**
 * 
 * @param {number[][]} mat An array containing all of the rows of the matrix, where each row is an array of the elements in that row
 */
export function matToString(mat)
{
	let rows = [];
    for (let row of mat)
    {
        rows.push("[" + row.toString() + "]");
    }

    return rows.toString();
}

export function toNerdamerMatrix(mat, transpose = false)
{
	let str = matToString(mat);

	// console.log("Convering matrix: " + str + " to nerdamer matrix");

	// if (transpose)
	// {
	// 	return nerdamer(`transpose(matrix(${str}))`);
	// }

	return nerdamer(`matrix(${str})`);
	
}