<script lang="ts">
	import { eventSystem } from '$lib/utils/events';
	import { containsName } from '$lib/utils/helpers';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
	import EventEntry from './EventEntry.svelte';

	type EventInfoWithReaction = EventInfo & { reaction: EventReaction | undefined };

	const sortByTime = (a: EventInfoWithReaction, b: EventInfoWithReaction) =>
		new Date(a.time).getTime() - new Date(b.time).getTime();

	let day = $state('Fri');

	function filterByDay(event: EventInfo) {
		const eventDate = new Date(event.time);
		const offsetEventDate = new Date(eventDate.getTime() - 3600 * 1000 * 3.5);
		const dayOfWeek = offsetEventDate.toLocaleString('en-US', { weekday: 'short' });
		return dayOfWeek === day;
	}

	let search = $state('');
	let reactedEvents = $derived(
		$eventSystem.events
			.filter(filterByDay)
			.filter((e) => containsName([...e.name.split(' '), ...e.venue.split(' '), e.country], search))
			.map((event) => ({
				...event,
				reaction: $eventSystem.reactions.get(event.id)
			}))
			.sort(sortByTime)
	);
</script>

<div class="bg-surface-100-900 flex justify-between p-2">
	<label class="label flex flex-col">
		<select class="select h-10 w-40" bind:value={day}>
			<option selected value="Fri">Friday</option>
			<option value="Sat">Saturday</option>
		</select>
		<!-- <label class="label flex flex-col">
			<span>Search</span>
			<input type="text" class="input select h-10 max-w-60" bind:value={search} />
		</label> -->
	</label>
</div>

<ul class="flex flex-col gap-4 p-4">
	{#each reactedEvents as event (event.id)}
		<EventEntry {event} reaction={event.reaction} />
	{/each}
</ul>
