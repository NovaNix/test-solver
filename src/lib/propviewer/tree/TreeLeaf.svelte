<script>
    import TreeNode from "./TreeNode.svelte"

    export let depth;
</script>

<TreeNode depth={depth}>
    <svelte:fragment slot="main">
        <slot/>
    </svelte:fragment>
</TreeNode>