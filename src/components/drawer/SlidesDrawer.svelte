<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import SwipableEvent from '$lib/SwipableEvent.svelte';
	import { eventSystem } from '$lib/events';
	import type { EventInfo, EventReaction } from '$lib/slides';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	function react(reaction: EventReaction) {
		eventSystem.update((e) => {
			e.reactions.set(event.id, reaction);
			return e;
		});
		drawerStore.close();
	}

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
			<SwipableEvent
				{event}
				on:heart={() => react('heart')}
				on:like={() => react('like')}
				on:pass={() => react('pass')}
			/>
		</div>
	</AspectRatio>
</div>
