<script lang="ts">
	import { eventSystem } from '$lib/utils/events';
	import { containsName } from '$lib/utils/helpers';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
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

	const sortByRank = (a: EventInfoWithReaction, b: EventInfoWithReaction) =>
		getRank(b) - getRank(a);
	const sortByName = (a: EventInfoWithReaction, b: EventInfoWithReaction) =>
		a.name.localeCompare(b.name);
	const sortByStage = (a: EventInfoWithReaction, b: EventInfoWithReaction) =>
		a.venue.localeCompare(b.venue);
	const sortByTime = (a: EventInfoWithReaction, b: EventInfoWithReaction) =>
		new Date(a.time).getTime() - new Date(b.time).getTime();

	let sorter = $state(sortByRank);

	let search = $state('');
	let reactedEvents = $derived(
		$eventSystem.events
			.map((event) => ({
				...event,
				reaction: $eventSystem.reactions.get(event.id)
			}))
			.filter((e) => containsName([...e.name.split(' '), ...e.venue.split(' '), e.country], search))
			.sort(sorter)
	);
</script>

<div class="mb-4 flex justify-between">
	<label class="label flex flex-col">
		<span>Sort by</span>
		<select class="select h-10 w-40" bind:value={sorter}>
			<option value={sortByStage}>Stages</option>
			<option selected value={sortByRank}>Your Reactions</option>
			<option value={sortByTime}>Time</option>
			<option value={sortByName}>Artist Name</option>
		</select>
	</label>
	<label class="label flex flex-col">
		<span>Search</span>
		<input type="text" class="input select h-10 max-w-60" bind:value={search} />
	</label>
</div>

<ul class="flex flex-col gap-4">
	{#each reactedEvents as event (event.id)}
		<EventEntry {event} reaction={event.reaction} />
	{/each}
</ul>
