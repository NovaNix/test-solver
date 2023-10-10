<script>
    import {Entity} from "../entities/entity.js"
    /** @type {Entity}*/
    export let entity;
</script>

<details class="tree-container">
    <summary class="tree-cell">{entity.name}</summary>

    <p class="tree-cell">fixed: {entity.fixed}</p>
    <p class="tree-cell">construction: {entity.construction}</p>

    {#each Object.entries(entity.data) as [name, data]}
        <p class="tree-cell">{name}: {data.value}</p>
    {/each}
</details>

