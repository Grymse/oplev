<script lang="ts">
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import { eventSystem } from '$lib/utils/events';
	import BookmarkIcon from '$lib/icons/BookmarkIcon.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import LikeIcon from '$lib/icons/LikeIcon.svelte';
	import NoneIcon from '$lib/icons/NoneIcon.svelte';
	import PassIcon from '$lib/icons/PassIcon.svelte';
	import type { EventReaction } from '$lib/utils/slides';
	import { stopPropagation } from 'svelte/legacy';

	type Props = {
		reaction: EventReaction | undefined;
		eventId: number;
	}

	let { reaction, eventId }: Props = $props();
	let openState = $state(false);

	const reactions = {
		heart: HeartIcon,
		like: LikeIcon,
		pass: PassIcon
	};

	function updateReaction(reaction: EventReaction | undefined) {
		eventSystem.update(e => {
			if (!reaction) {
				e.reactions.delete(eventId);
			} else {
				e.reactions.set(eventId, reaction);
			}
			return e;
		});
	}

	function openPopover(e: MouseEvent | KeyboardEvent | TouchEvent) {
		e.stopPropagation();
		openState = true;
	}
</script>

<Popover
  open={openState}
  onOpenChange={(e) => (openState = e.open)}
  positioning={{ placement: 'right' }}
  triggerBase="btn-icon text-white text-opacity-50"
  contentBase="card bg-surface-200-800 p-4 space-y-4 max-w-[320px]"
  arrow
  arrowBackground="!bg-surface-200 dark:!bg-surface-800"
>
{#snippet trigger()}
<div class="w-full h-full"
  role="button"
  tabindex="0"
onkeypress={openPopover}
onclick={openPopover}
ontouchstart={openPopover}
>
	{#if reaction}
		{@const SvelteComponent = reactions[reaction]}
		<SvelteComponent />
	{:else}
		<BookmarkIcon />
	{/if}
</div>
{/snippet}
{#snippet content()}
<div
	role="button"
	tabindex="0"
	onkeypress={e => e.stopPropagation()}
	onclick={e => e.stopPropagation()}
	ontouchstart={e => e.stopPropagation()}
	aria-label="Reaction"
	class="card p-4 shadow-xl"
>
	<div class="flex gap-4">
		<button class="btn-icon text-primary-500" onclick={() => updateReaction('heart')}>
			<HeartIcon />
		</button>
		<button class="btn-icon text-secondary-500" onclick={() => updateReaction('like')}>
			<LikeIcon />
		</button>
		<button class="btn-icon text-tertiary-500" onclick={() => updateReaction('pass')}>
			<PassIcon />
		</button>
		<button class="btn-icon" onclick={() => updateReaction(undefined)}>
			<NoneIcon />
		</button>
	</div>
</div>
{/snippet}
</Popover>


