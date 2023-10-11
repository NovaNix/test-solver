<script>
    import {Entity} from "../entities/entity.js"
    /** @type {Entity}*/
    export let entity;

    const icons = {
        "point": "scatter_plot",
        "line": "pen_size_1",
        "circle": "circle",
        "arc": "progress_activity"
    }

</script>

<details class="tree-container">
    <summary class="tree-cell">
        {entity.name}
        <!-- <span class="icon material-symbols-outlined">{icons[entity.type]}</span>{entity.name} -->
    </summary>

    {#each Object.entries(entity.data) as [name, data]}
        <p class="tree-cell">{name}: {data.value}</p>
    {/each}

    <p class="tree-cell">fixed: {entity.fixed}</p>
    <p class="tree-cell">construction: {entity.construction}</p>
</details>

<style>
    .icon {
        height: 100%;
    }

    summary {
        /* display: inline-block; */
        line-height: 22px;
        height: 22px;
        vertical-align: middle;
    }

    summary span {
        display: inline-block;
        line-height: 22px;
        height: 22px;
    }

    summary * {
        display: inline-block;
        height: 100%;
    }
</style>