<script lang="ts">
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet;
		content: Snippet<[() => void]>;
		positioning?: {
			placement: 'top' | 'bottom' | 'left' | 'right';
		};
	};

	let { trigger: innerTrigger, content: innerContent, positioning }: Props = $props();
	let openState = $state(false);

	function openPopover(e: MouseEvent | KeyboardEvent | TouchEvent) {
		e.stopPropagation();
		openState = true;
	}
	function closePopover() {
		openState = false;
	}
</script>

<Popover
	open={openState}
	onOpenChange={(e) => (openState = e.open)}
	{positioning}
	triggerBase="btn-icon text-white text-opacity-50"
	contentBase="card bg-surface-200-800 p-4 space-y-4 max-w-[320px]"
	arrow
	arrowBackground="!bg-surface-200 dark:!bg-surface-800"
>
	{#snippet trigger()}
		<div
			class="h-full w-full"
			role="button"
			tabindex="0"
			onkeypress={openPopover}
			onclick={openPopover}
			ontouchstart={openPopover}
		>
			{@render innerTrigger()}
		</div>
	{/snippet}
	{#snippet content()}
		<div
			role="button"
			tabindex="0"
			onkeypress={(e) => e.stopPropagation()}
			onclick={(e) => e.stopPropagation()}
			ontouchstart={(e) => e.stopPropagation()}
		>
			{@render innerContent(closePopover)}
		</div>
	{/snippet}
</Popover>
