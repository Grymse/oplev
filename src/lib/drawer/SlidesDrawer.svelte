<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import Event from '$lib/event/Event.svelte';
	import type { EventInfo } from '$lib/slides';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	export let event: EventInfo;
</script>

<AspectRatio ratio={9 / 16}>
	<Event active {event} />
</AspectRatio>
