<script lang="ts">
	import { createBubbler, stopPropagation } from 'svelte/legacy';

	const bubble = createBubbler();
	import { eventSystem } from '$lib/events';
	import BookmarkIcon from '$lib/reactions/BookmarkIcon.svelte';
	import HeartIcon from '$lib/reactions/HeartIcon.svelte';
	import LikeIcon from '$lib/reactions/LikeIcon.svelte';
	import NoneIcon from '$lib/reactions/NoneIcon.svelte';
	import PassIcon from '$lib/reactions/PassIcon.svelte';
	import type { EventReaction } from '$lib/slides';

	interface Props {
		reaction: EventReaction | undefined;
		eventId: number;
	}

	let { reaction, eventId }: Props = $props();

	const reactions = {
		heart: HeartIcon,
		like: LikeIcon,
		pass: PassIcon
	};

	function updateReaction(reaction: EventReaction | undefined) {
		eventSystem.update((e) => {
			if (!reaction) {
				e.reactions.delete(eventId);
			} else {
				e.reactions.set(eventId, reaction);
			}
			return e;
		});
	}
	eventSystem;

	const reactionPopup: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'reactionPopup-' + eventId,
		// Defines which side of your trigger the popup will appear
		placement: 'left'
	};
</script>

<div
	role="button"
	tabindex="0"
	onkeypress={stopPropagation(bubble('keypress'))}
	aria-label="Reaction"
	class="card p-4 shadow-xl"
	data-popup={reactionPopup.target}
	onclick={stopPropagation(bubble('click'))}
	ontouchstart={stopPropagation(bubble('touchstart'))}
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

<div onclick={stopPropagation(bubble('click'))} role="button" tabindex="0" onkeypress={stopPropagation(bubble('keypress'))}>
	<button
		use:popup={reactionPopup}
		class="absolute btn-icon bottom-6 right-2 text-white text-opacity-50"
	>
		<div class="w-full h-full">
			{#if reaction}
				{@const SvelteComponent = reactions[reaction]}
				<SvelteComponent />
			{:else}
				<BookmarkIcon />
			{/if}
		</div>
	</button>
</div>
