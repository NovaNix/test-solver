<script>
    import katex from 'katex';

    export let latex;

    let container;

    function render(func, element)
    {
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
