<script lang="ts">
	import OpenSlidesModal from '$lib/modal/OpenSlidesModal.svelte';
	import type { EventInfo, EventReaction } from '$lib/slides';
	import { ISOToTimeDay } from '$lib/translations';
	import EventReactionStatus from './EventReactionStatus.svelte';
	interface Props {
		event: EventInfo;
		reaction: EventReaction | undefined;
	}

	let { event, reaction }: Props = $props();
</script>

<li
	class="relative rounded-container overflow-hidden min-h-24 h-24"
	class:bg-purple-800={!reaction}
	class:bg-primary-800={reaction === 'heart'}
	class:bg-secondary-800={reaction === 'like'}
	class:bg-tertiary-800={reaction === 'pass'}
>
	<OpenSlidesModal {event}>
		{#snippet trigger()}
			<div class="w-full h-full flex">
				{#if event.img}
					<img src={event.img} alt="" class="h-full max-w-24" />
				{/if}
				<div class="p-4 py-3">
					<h3 class="h3">{event.name} ({event.country})</h3>
					<h5 class="h5">{event.venue}</h5>
					<p>{ISOToTimeDay(event.time)}</p>
				</div>
			</div>
		{/snippet}
		<!-- <EventReactionStatus eventId={event.id} {reaction} /> -->
	</OpenSlidesModal>
</li>
