<script>
    import {Entity} from "../entities/entity.js"
    import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";

    import * as solver from "../solver/solver.js";

    /** @type {Entity}*/
    export let entity;

    export let depth = 0;

    let selected = entity.selected;
    let hover = entity.hover;

    const icons = {
        "point": "scatter_plot",
        "line": "pen_size_1",
        "circle": "circle",
        "arc": "progress_activity"
    }

    function onClick(event)
    {
        solver.select(entity.address);

        event.stopPropagation();
    }

    function onMouseEnter(event)
    {
        $hover = true; 
    }

    function onMouseLeave(event)
    {
        $hover = false;
    }

</script>

<TreeNode 
depth={depth + 1} 
selected={$selected} 
hover={$hover} 
on:click={onClick} 
on:mouseenter={onMouseEnter}
on:mouseleave={onMouseLeave}
>
    <svelte:fragment slot="main">
        <span class="icon entity-icon material-symbols-outlined">{icons[entity.type]}</span>
        <p class="entity-name">{entity.name}</p>
        {#if entity.solved}<span class="solved-icon icon material-symbols-outlined">check_circle</span>{/if}
    </svelte:fragment>
    <svelte:fragment slot="children">
        {#each Object.entries(entity.data) as [name, data]}
            {#if data instanceof Entity}
                <svelte:self depth={depth + 1} entity={data}/>
            {:else}
                <TextLeaf depth={depth + 2}><p>{name}: {data.value}</p></TextLeaf>
            {/if}
            
        {/each}

        <TextLeaf depth={depth + 2}><p>fixed: {entity.fixed}</p></TextLeaf>
        <TextLeaf depth={depth + 2}><p>construction: {entity.construction}</p></TextLeaf>
    </svelte:fragment>
</TreeNode>

<style>
    

    .entity-name {
        padding-left: 5px;
        font-weight: bold;
    }

    p {
        /* display: inline-block; */
        line-height: 22px;
        height: 22px;
        vertical-align: middle;

        font-size: 11pt;
        color: #C3C3C3;
        margin: 0;

        /* font-family: ui-monospace; */
    }

    .entity-icon {
        color: #00D4A3;
    }

    .solved-icon {
        color: lime;
        margin-left: auto;
    }

</style>