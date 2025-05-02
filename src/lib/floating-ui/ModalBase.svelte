<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet;
		content: Snippet<[() => void]>;
		background?: 'none' | 'card';
	};

	let { trigger, content: innerContent, background = 'card' }: Props = $props();

	let drawerState = $state(false);

	function closeDrawer() {
		drawerState = false;
	}

	const cardContentBase = 'card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm';
	const noneContentBase = 'w-full h-full';
</script>

<Modal
	open={drawerState}
	onOpenChange={(e) => (drawerState = e.open)}
	triggerBase="w-full h-full"
	contentBase={background === 'card' ? cardContentBase : noneContentBase}
	backdropClasses="backdrop-blur-sm"
	{trigger}
>
	{#snippet content()}{@render innerContent(closeDrawer)}{/snippet}
</Modal>
