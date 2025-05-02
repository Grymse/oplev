<script lang="ts">
	import AspectRatio from '$lib/ui/AspectRatio.svelte';
	import SwipableEvent from '$lib/event/SwipableEvent.svelte';
	import { eventSystem } from '$lib/utils/events';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
	import type { Snippet } from 'svelte';
	import ModalBase from '../ModalBase.svelte';

	function onreact(reaction: EventReaction) {
		eventSystem.update((e) => {
			e.reactions.set(event.id, reaction);
			return e;
		});
	}

	type Props = {
		event: EventInfo;
		trigger: Snippet;
	};

	let { event, trigger }: Props = $props();
</script>

<ModalBase background="none" {trigger}>
	{#snippet content(closeDrawer)}
		<div
			role="button"
			tabindex="-1"
			onkeypress={(e) => e.stopPropagation()}
			class="flex h-full w-full items-center justify-center"
			onclick={closeDrawer}
		>
			<AspectRatio ratio={10 / 16} offsetMaxHeight={50} offsetMaxWidth={50}>
				<SwipableEvent {event} {onreact} />
			</AspectRatio>
		</div>
	{/snippet}
</ModalBase>
