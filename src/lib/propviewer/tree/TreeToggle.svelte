<script>
    import TreeNode from "./TreeNode.svelte"

    export let depth;
    export let name;
    export let value;
</script>

<TreeNode depth={depth}>
    <svelte:fragment slot="main">
        <div>
            <label for={name}><slot/></label>
            <input type="checkbox" name={name} bind:checked={value} />
          </div>
        
    </svelte:fragment>
</TreeNode>

<style>
    label {
        /* display: inline-block; */
        line-height: 22px;
        height: 22px;
        vertical-align: middle;

        font-size: 11pt;
        color: #C3C3C3;
        margin: 0;

        /* font-family: ui-monospace; */
    }
</style>