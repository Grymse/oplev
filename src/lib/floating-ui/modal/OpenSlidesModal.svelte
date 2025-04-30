<script lang="ts">
	import AspectRatio from '$lib/ui/AspectRatio.svelte';
	import SwipableEvent from '$lib/SwipableEvent.svelte';
	import { eventSystem } from '$lib/utils/events';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
	import type { Snippet } from 'svelte';
	import ModalBase from '../ModalBase.svelte';

	function react(reaction: EventReaction) {
		eventSystem.update((e) => {
			e.reactions.set(event.id, reaction);
			return e;
		});
	}

	type Props = {
		event: EventInfo;
		trigger: Snippet;
	}

	let { event, trigger }: Props = $props();
</script>



<ModalBase
trigger={trigger}
background="none"
>
{#snippet content(closeDrawer)}
	<div
		role="button"
		tabindex="-1"
		onkeypress={(e) => e.stopPropagation()}
		class="w-full h-full"
		onclick={closeDrawer}
	>
		<AspectRatio ratio={10 / 16}>
			<div
				role="button"
				tabindex="-1"
				onkeypress={(e) => e.stopPropagation()}
				class="w-full h-full"
				onclick={(e) => e.stopPropagation()}
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
{/snippet}
</ModalBase>