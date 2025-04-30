<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet;
		content: Snippet<[() => void]>;
	};

	let { trigger, content: innerContent }: Props = $props();

	let drawerState = $state(false);

	function closeDrawer() {
		drawerState = false;
	}
</script>

<Modal
	open={drawerState}
	onOpenChange={(e) => (drawerState = e.open)}
	triggerBase="w-full h-full"
	contentBase="bg-surface-100-900 w-full h-full bg-transparent"
	positionerClasses="flex items-end"
	{trigger}
>
	{#snippet content()}{@render innerContent(closeDrawer)}{/snippet}
</Modal>
