<script>
    import {Ref} from "../entities/entity.js"
    import TreeNode from "./tree/TreeNode.svelte"

    /** @type {Ref|number} */
    export let value;
    export let depth = 0;
    export let name;

    $: v = value instanceof Ref ? value.address : value;
</script>

<TreeNode depth={depth}>
    <svelte:fragment slot="main">
        <div>
            <label for={name}>{name}:</label>
            <input type="text" name={name} bind:value={v} />
        </div>
        
    </svelte:fragment>
</TreeNode>

<style>
    input {
        height: 20px;
        box-sizing: border-box;
    }
</style>