<script lang="ts">
	import { eventSystem } from '$lib/utils/events';
	import BookmarkIcon from '$lib/icons/BookmarkIcon.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import LikeIcon from '$lib/icons/LikeIcon.svelte';
	import NoneIcon from '$lib/icons/NoneIcon.svelte';
	import PassIcon from '$lib/icons/PassIcon.svelte';
	import type { EventReaction } from '$lib/utils/slides';
	import PopoverBase from '../PopoverBase.svelte';

	type Props = {
		reaction: EventReaction | undefined;
		eventId: number;
	};

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
</script>

<PopoverBase positioning={{ placement: 'right' }}>
	{#snippet trigger()}
		{#if reaction}
			{@const SvelteComponent = reactions[reaction]}
			<SvelteComponent />
		{:else}
			<BookmarkIcon />
		{/if}
	{/snippet}
	{#snippet content(close)}
		<div class="flex gap-4" autofocus onblur={close}>
			<button
				class="btn-icon text-primary-500"
				onclick={() => {
					updateReaction('heart');
					close();
				}}
			>
				<HeartIcon />
			</button>
			<button
				class="btn-icon text-secondary-500"
				onclick={() => {
					updateReaction('like');
					close();
				}}
			>
				<LikeIcon />
			</button>
			<button
				class="btn-icon text-tertiary-100 h-5 w-5"
				onclick={() => {
					updateReaction('pass');
					close();
				}}
			>
				<PassIcon />
			</button>
			<button
				class="btn-icon"
				onclick={() => {
					updateReaction(undefined);
					close();
				}}
			>
				<NoneIcon />
			</button>
		</div>
	{/snippet}
</PopoverBase>
