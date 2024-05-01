<script lang="ts">
	import { eventSystem } from '$lib/events';
	import EventEntry from './EventEntry.svelte';
</script>

<ul class="gap-4 flex flex-col">
	{#each $eventSystem.events as event}
		<EventEntry {event} reaction={$eventSystem.reactions.get(event.id)} />
	{/each}
</ul>
