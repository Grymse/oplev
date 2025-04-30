<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

    type Props = {
        trigger: Snippet;
        content: Snippet<[() => void]>;
	}

	let { trigger, content: innerContent }: Props = $props();
  
    let drawerState = $state(false);
  
    function closeDrawer() {
      drawerState = false;
    }
  </script>
  
  <Modal
    open={drawerState}
    onOpenChange={(e) => (drawerState = e.open)}
    contentBase="bg-surface-100-900 p-4 w-full h-fit rounded-xl shadow-xl"
    positionerClasses="p-4 flex items-end"
    transitionsPositionerIn={{ y: 350, duration: 200 }}
    transitionsPositionerOut={{ y: 350, duration: 200 }}
    trigger={trigger}
  >
    {#snippet content()}{@render innerContent(closeDrawer)}{/snippet}
  </Modal>