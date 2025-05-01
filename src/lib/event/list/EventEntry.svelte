<script lang="ts">
	import OpenSlidesModal from '$lib/floating-ui/modal/OpenSlidesModal.svelte';
	import type { EventInfo, EventReaction } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import EventReactionPopover from '../../floating-ui/popover/EventReactionPopover.svelte';

	type Props = {
		event: EventInfo;
		reaction: EventReaction | undefined;
	};

	let { event, reaction }: Props = $props();
</script>

<li class="w-full">
	<OpenSlidesModal {event}>
		{#snippet trigger()}
			<div class="grid h-full w-full grid-cols-[1fr_48px]">
				<div class="flex items-center overflow-hidden">
					{#if event.img}
						<img src={event.img} alt="" class="h-14 w-14 object-cover" />
					{/if}
					<div class="px-4 text-left">
						<p class="text-nowrap">{event.name} ({event.country})</p>
						<p class="text-surface-600-400 text-sm text-nowrap">
							{ISOToTimeDay(event.time)}
							• {event.venue}
						</p>
					</div>
				</div>
				<EventReactionPopover eventId={event.id} {reaction} />
			</div>
		{/snippet}
	</OpenSlidesModal>
</li>
