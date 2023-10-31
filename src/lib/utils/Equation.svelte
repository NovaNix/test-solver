<script>
    import katex from 'katex';

    /** @type {string | number[][]} */
    export let latex;
    export let matrix = false;

    /**
     * @param {number[][] | number[]} m
     */
    function matrixToLatex(m)
    {
        console.log(m);

        let latex = "\\begin{bmatrix}";

        for (let row of m)
        {
            // Limit the decimal places
            let fixedRow;
            if (row instanceof Array)
            {
                fixedRow = row.map((x) => x.toFixed(4));
            }

            else
            {
                fixedRow = [row.toFixed(4)];
            }

            latex += fixedRow.join(" & ") + "\\\\";
        }

        latex += "\\end{bmatrix}";

        console.log(latex);

        return latex;
    }

    let container;

    function render(func, element)
    {
        if (matrix)
        {
            func = matrixToLatex(func);
        }

        if (element == null)
        {
            return;
        }

        element.innerHTML = "";

        katex.render(func, element, {
            throwOnError: false
        });
    }

    $: render(latex, container);
</script>

<div bind:this={container}></div>

<style>
    div {
        padding: 3px;
    }
</style>
