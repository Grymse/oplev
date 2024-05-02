<script lang="ts">
	import SwipableEvent from './SwipableEvent.svelte';
	import Event from './event/Event.svelte';
	import { eventSystem, react } from './events';

	$: reactedEventIds = Array.from($eventSystem.reactions.keys());
	$: events = $eventSystem.events.filter((event) => reactedEventIds.includes(event.id) === false);
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
	<SwipableEvent event={currentEvent} on:heart={heart} on:like={like} on:pass={pass} />
	<div class="absolute pointer-events-none -z-10 top-0 left-0 w-full h-full">
		<Event event={nextEvent} />
	</div>
</div>
