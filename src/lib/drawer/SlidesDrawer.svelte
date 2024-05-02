<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import Event from '$lib/event/Event.svelte';
	import type { EventInfo } from '$lib/slides';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	export let event: EventInfo;
</script>

<div
	role="button"
	tabindex="-1"
	on:keypress|stopPropagation
	class="w-full h-full"
	on:click={drawerStore.close}
>
	<AspectRatio ratio={10 / 16}>
		<div
			role="button"
			tabindex="-1"
			on:keypress|stopPropagation
			class="w-full h-full"
			on:click|stopPropagation
		>
			<Event active {event} />
		</div>
	</AspectRatio>
</div>
