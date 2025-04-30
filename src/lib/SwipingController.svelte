<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	import SwipableEvent from './SwipableEvent.svelte';
	import Event from './event/Event.svelte';
	import NoMoreEvents from './event/NoMoreEvents.svelte';
	import { eventSystem, react } from './utils/events';
	import type { EventReaction } from './utils/slides';

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

<div class="absolute -bottom-1 left-0 w-full h-0">
	<Progress value={index + reactedEventCount} max={$eventSystem.events.length} rounded="none"/>
</div>

<div class="h-full w-full relative">
	{#if currentEvent}
		<SwipableEvent event={currentEvent} {onreact} />
	{:else}
		<NoMoreEvents />
	{/if}
	<div class="absolute pointer-events-none -z-10 top-0 left-0 w-full h-full">
		{#if nextEvent}
			<Event event={nextEvent} />
		{:else if currentEvent}
			<NoMoreEvents />
		{/if}
	</div>
</div>
