<script lang="ts">
	import OpenSlidesButton from '$lib/drawer/buttons/OpenSlidesButton.svelte';
	import HeartIcon from '$lib/reactions/HeartIcon.svelte';
	import LikeIcon from '$lib/reactions/LikeIcon.svelte';
	import PassIcon from '$lib/reactions/PassIcon.svelte';
	import type { EventInfo, EventReaction } from '$lib/slides';
	import { ISOToTimeDay } from '$lib/translations';
	export let event: EventInfo;
	export let reaction: EventReaction | undefined;

	const reactions = {
		heart: HeartIcon,
		like: LikeIcon,
		pass: PassIcon
	};
</script>

<li
	class="relative rounded-container-token overflow-hidden min-h-36 h-36"
	class:bg-purple-800={!reaction}
	class:bg-primary-800={reaction === 'heart'}
	class:bg-secondary-800={reaction === 'like'}
	class:bg-tertiary-800={reaction === 'pass'}
>
	<OpenSlidesButton {event}>
		<div class="w-full h-full flex">
			{#if event.img}
				<img src={event.img} alt="" class="h-full" />
			{/if}
			<div class="p-4">
				<h2 class="h2">{event.name} ({event.country})</h2>
				<h4 class="h4">{event.venue}</h4>
				<p>{ISOToTimeDay(event.time)}</p>
			</div>
			<button class="absolute btn-icon bottom-2 right-2 text-white text-opacity-50">
				{#if reaction}
					<svelte:component this={reactions[reaction]} />
				{/if}
			</button>
		</div>
	</OpenSlidesButton>
</li>
