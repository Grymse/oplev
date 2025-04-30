<script lang="ts">
	import OpenSlidesModal from '$lib/floating-ui/modal/OpenSlidesModal.svelte';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import EventReactionPopover from '../floating-ui/popover/EventReactionPopover.svelte';

	type Props = {
		event: EventInfo;
		reaction: EventReaction | undefined;
	};

	let { event, reaction }: Props = $props();
</script>

<li
	class="rounded-container relative h-24 min-h-24 overflow-hidden"
	class:bg-purple-800={!reaction}
	class:bg-primary-800={reaction === 'heart'}
	class:bg-secondary-800={reaction === 'like'}
	class:bg-tertiary-800={reaction === 'pass'}
>
	<OpenSlidesModal {event}>
		{#snippet trigger()}
			<div class="flex h-full w-full items-center justify-between">
				<div class="flex">
					{#if event.img}
						<img src={event.img} alt="" class="h-full max-w-24" />
					{/if}
					<div class="p-4 py-3 text-left">
						<h5 class="h5">{event.name} ({event.country})</h5>
						<p>{event.venue}</p>
						<p class="text-amber-500">{ISOToTimeDay(event.time)}</p>
					</div>
				</div>
				<EventReactionPopover eventId={event.id} {reaction} />
			</div>
		{/snippet}
	</OpenSlidesModal>
</li>
