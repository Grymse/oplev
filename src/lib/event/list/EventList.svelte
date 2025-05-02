<script lang="ts">
	import { eventSystem } from '$lib/utils/events';
	import { containsName } from '$lib/utils/helpers';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
	import { Box, ThumbsUp } from '@lucide/svelte';
	import EventEntry from './EventEntry.svelte';
	import Search from '$lib/ui/Search.svelte';
	import OpenMultiSelectModal from '$lib/floating-ui/modal/OpenMultiSelectModal.svelte';

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

	type Filter = {
		func: (event: EventInfo) => boolean;
		name: string;
	};

	const noFilter: Filter = {
		func: () => true,
		name: 'none'
	};

	let filter: Filter = $state(noFilter);

	let search = $state('');

	$effect(() => {
		setSearchFilter(search);
	});

	function setSearchFilter(search: string) {
		if (search.trim().length === 0) return clearFilter();

		filter = {
			func: (event) =>
				containsName([...event.name.split(' '), ...event.venue.split(' '), event.country], search),
			name: 'search'
		};
	}

	let reactedEvents = $derived(
		$eventSystem.events
			.filter(filterByDay)
			.filter(filter.func)
			.map((event) => ({
				...event,
				reaction: $eventSystem.reactions.get(event.id)
			}))
			.sort(sortByTime)
	);

	function setLikesFiles() {
		if (filter.name === 'likes') return clearFilter();

		filter = {
			func: (event) => ['like', 'heart'].includes($eventSystem.reactions.get(event.id) || ''),
			name: 'likes'
		};
	}

	function clearFilter() {
		filter = noFilter;
	}

	function unique(arr: string[]) {
		return [...new Set(arr)].sort((a, b) => a.localeCompare(b));
	}

	let selectedStages: string[] = $state([]);
	const availableStages = unique(
		$eventSystem.events.map((event) => event.venue).filter((s) => s.trim().length !== 0)
	);

	$effect(() => {
		setStagesFiles(selectedStages);
	});

	function setStagesFiles(selectedStages: string[]) {
		if (selectedStages.length === 0 || selectedStages.length === availableStages.length)
			return clearFilter();

		filter = {
			func: (event) => selectedStages.includes(event.venue),
			name: 'stages'
		};
	}
</script>

<div class="bg-surface-100-900 flex items-center justify-between p-2 px-4">
	<select class="h-10 w-fit border-none px-2 outline-none" bind:value={day}>
		<option selected value="Fri">Friday</option>
		<option value="Sat">Saturday</option>
	</select>
	<div class="flex items-center gap-2">
		<button
			class="btn-icon"
			class:preset-filled-primary-500={filter.name === 'likes'}
			onclick={setLikesFiles}
		>
			<ThumbsUp />
		</button>
		<OpenMultiSelectModal
			bind:values={selectedStages}
			options={availableStages}
			title="Select stages"
		>
			{#snippet trigger()}
				<button
					onclick={() => setStagesFiles(selectedStages)}
					class="btn-icon"
					class:preset-filled-primary-500={filter.name === 'stages'}
				>
					<Box />
				</button>
			{/snippet}
		</OpenMultiSelectModal>
		<Search
			bind:search
			isActive={filter.name === 'search'}
			onclick={() => setSearchFilter(search)}
		/>
	</div>

	<!-- <label class="label flex flex-col">
			<span>Search</span>
			<input type="text" class="input select h-10 max-w-60" bind:value={search} />
		</label> -->
</div>

<ul class="flex flex-col gap-4 p-4">
	{#each reactedEvents as event (event.id)}
		<EventEntry {event} reaction={event.reaction} />
	{/each}
</ul>
