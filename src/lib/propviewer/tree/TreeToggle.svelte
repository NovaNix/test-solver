<script>
    import { LockableVStore, VStore } from "../../utils/vstore";
    import TreeNode from "./TreeNode.svelte"

    /** @type {number} */
    export let depth;
    /** @type {string} */
    export let name;

    /** @type {VStore<boolean>}*/
    export let obj;

    /** @type {boolean} */
    let locked;

    $: locked = obj instanceof LockableVStore ? obj.locked : false;
    
</script>

<TreeNode depth={depth}>
    <svelte:fragment slot="main">
        <div>
            <label for={name}><slot/></label>
            <input type="checkbox" 
                name={name} 
                bind:checked={$obj} 
                disabled={locked}
            />
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