<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	import SwipableEvent from './SwipableEvent.svelte';
	import Event from './Event.svelte';
	import NoMoreEvents from './NoMoreEvents.svelte';
	import { eventSystem, react } from '$lib/utils/events';
	import type { EventReaction } from '$lib/utils/slides';

	const reactedEventIds = Array.from($eventSystem.reactions.keys());
	const reactedEventCount = reactedEventIds.length;

	const events = $eventSystem.events.filter(
		(event) => reactedEventIds.includes(event.id) === false
	);

	let index = $state(0);
	let currentEvent = $derived(events[index]);
	let nextEvent = $derived(events[index + 1]);

	function onreact(reaction: EventReaction) {
		setTimeout(() => {
			react(currentEvent, reaction);
			index++;
		}, 50);
	}
</script>

<div class="absolute -bottom-1 left-0 h-0 w-full">
	<Progress value={index + reactedEventCount} max={$eventSystem.events.length} rounded="none" />
</div>

<div class="relative h-full w-full">
	{#if currentEvent}
		<SwipableEvent event={currentEvent} {onreact} />
	{:else}
		<NoMoreEvents />
	{/if}
	<div class="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full">
		{#if nextEvent}
			<Event event={nextEvent} />
		{:else if currentEvent}
			<NoMoreEvents />
		{/if}
	</div>
</div>
