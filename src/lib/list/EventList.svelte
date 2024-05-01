<script lang="ts">
	import { eventSystem } from '$lib/events';
	import type { EventInfo, EventReaction } from '$lib/slides';
	import EventEntry from './EventEntry.svelte';

	type EventInfoWithReaction = EventInfo & { reaction: EventReaction | undefined };

	function getRank(event: EventInfoWithReaction): number {
		return event.reaction === 'heart'
			? 3
			: event.reaction === 'like'
				? 2
				: event.reaction === 'pass'
					? 1
					: 0;
	}

	let sorter = (a: EventInfoWithReaction, b: EventInfoWithReaction) => getRank(b) - getRank(a);
	$: reactedEvents = $eventSystem.events
		.map((event) => ({
			...event,
			reaction: $eventSystem.reactions.get(event.id)
		}))
		.sort(sorter);
</script>

<ul class="gap-4 flex flex-col">
	{#each reactedEvents as event}
		<EventEntry {event} reaction={event.reaction} />
	{/each}
</ul>
