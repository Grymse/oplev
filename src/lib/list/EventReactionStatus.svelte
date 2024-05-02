<script lang="ts">
	import { eventSystem } from '$lib/events';
	import HeartIcon from '$lib/reactions/HeartIcon.svelte';
	import LikeIcon from '$lib/reactions/LikeIcon.svelte';
	import NoneIcon from '$lib/reactions/NoneIcon.svelte';
	import PassIcon from '$lib/reactions/PassIcon.svelte';
	import type { EventReaction } from '$lib/slides';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let reaction: EventReaction | undefined;
	export let eventId: number;

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
	on:keypress|stopPropagation
	aria-label="Reaction"
	class="card p-4 shadow-xl"
	data-popup={reactionPopup.target}
	on:click|stopPropagation
	on:touchstart|stopPropagation
>
	<div class="flex gap-4">
		<button class="btn-icon text-primary-500" on:click={() => updateReaction('heart')}>
			<HeartIcon />
		</button>
		<button class="btn-icon text-secondary-500" on:click={() => updateReaction('like')}>
			<LikeIcon />
		</button>
		<button class="btn-icon text-tertiary-500" on:click={() => updateReaction('pass')}>
			<PassIcon />
		</button>
		<button class="btn-icon" on:click={() => updateReaction(undefined)}>
			<NoneIcon />
		</button>
	</div>
</div>

<div on:click|stopPropagation role="button" tabindex="0" on:keypress|stopPropagation>
	<button
		use:popup={reactionPopup}
		class="absolute btn-icon bottom-2 right-2 text-white text-opacity-50"
	>
		<div class="w-full h-full">
			{#if reaction}
				<svelte:component this={reactions[reaction]} />
			{/if}
		</div>
	</button>
</div>
