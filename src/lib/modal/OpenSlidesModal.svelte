<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import SwipableEvent from '$lib/SwipableEvent.svelte';
	import { eventSystem } from '$lib/events';
	import type { EventInfo, EventReaction } from '$lib/slides';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	function react(reaction: EventReaction) {
		eventSystem.update((e) => {
			e.reactions.set(event.id, reaction);
			return e;
		});
	}

	let drawerState = $state(false);

	interface Props {
		event: EventInfo;
		trigger: Snippet;
	}

	let { event, trigger }: Props = $props();
</script>



<Modal
open={drawerState}
onOpenChange={(e) => (drawerState = e.open)}
triggerBase="w-full h-full"
contentBase="bg-surface-100-900 w-full h-full bg-transparent"
positionerClasses="flex items-end"
trigger={trigger}
>
{#snippet content()}
	<div
		role="button"
		tabindex="-1"
		onkeypress={(e) => e.stopPropagation()}
		class="w-full h-full"
		onclick={() => {drawerState = false}}
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
</Modal>