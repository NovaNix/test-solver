<script>
    import {Entity} from "../entities/entity.js"
    import TextLeaf from "./tree/TreeLeaf.svelte";
    import TreeNode from "./tree/TreeNode.svelte";
    /** @type {Entity}*/
    export let entity;

    export let depth = 0;

    const icons = {
        "point": "scatter_plot",
        "line": "pen_size_1",
        "circle": "circle",
        "arc": "progress_activity"
    }

    function onClick(event)
    {
        
    }

</script>

<TreeNode depth={depth + 1}>
    <svelte:fragment slot="main">
        <span class="icon material-symbols-outlined">{icons[entity.type]}</span><p class="entity-name">{entity.name}</p>
    </svelte:fragment>
    <svelte:fragment slot="children">
        {#each Object.entries(entity.data) as [name, data]}
            <TextLeaf depth={depth + 2}><p>{name}: {data.value}</p></TextLeaf>
        {/each}

        <TextLeaf depth={depth + 2}><p>fixed: {entity.fixed}</p></TextLeaf>
        <TextLeaf depth={depth + 2}><p>construction: {entity.construction}</p></TextLeaf>
    </svelte:fragment>
</TreeNode>

<style>
    

    .entity-name {
        padding-left: 5px;
    }

    p {
        /* display: inline-block; */
        line-height: 22px;
        height: 22px;
        vertical-align: middle;

        font-size: 11pt;
        color: #C3C3C3;
        margin: 0;
    }

    /* summary span {
        display: inline-block;
        line-height: 22px;
        height: 22px;
    } */

    /* summary * {
        display: inline-block;
        height: 100%;
    } */
</style>