<script lang="ts">
	import SwipableEvent from './SwipableEvent.svelte';
	import Event from './event/Event.svelte';
	import NoMoreEvents from './event/NoMoreEvents.svelte';
	import { eventSystem, react } from './events';

	const reactedEventIds = Array.from($eventSystem.reactions.keys());
	const events = $eventSystem.events
		.filter((event) => reactedEventIds.includes(event.id) === false)
		.filter((_, i) => i < 2);
	let index = 0;
	$: currentEvent = events[index];
	$: nextEvent = events[index + 1];

	function like() {
		setTimeout(() => {
			react(currentEvent, 'like');
			index++;
		}, 50);
	}

	function pass() {
		react(currentEvent, 'pass');
		index++;
	}

	function heart() {
		react(currentEvent, 'heart');
		index++;
	}
</script>

<div class="h-full w-full relative">
	{#if currentEvent}
		<SwipableEvent event={currentEvent} on:heart={heart} on:like={like} on:pass={pass} />
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
