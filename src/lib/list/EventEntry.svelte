<script lang="ts">
	import OpenSlidesButton from '$lib/drawer/buttons/OpenSlidesButton.svelte';
	import type { EventInfo, EventReaction } from '$lib/slides';
	import { ISOToTimeDay } from '$lib/translations';
	import EventReactionStatus from './EventReactionStatus.svelte';
	export let event: EventInfo;
	export let reaction: EventReaction | undefined;
</script>

<li
	class="relative rounded-container-token overflow-hidden min-h-36 h-36"
	class:bg-purple-800={!reaction}
	class:bg-primary-800={reaction === 'heart'}
	class:bg-secondary-800={reaction === 'like'}
	class:bg-tertiary-800={reaction === 'pass'}
>
	<OpenSlidesButton {event}>
		<div class="w-full h-full flex">
			{#if event.img}
				<img src={event.img} alt="" class="h-full max-w-36" />
			{/if}
			<div class="p-4">
				<h2 class="h2">{event.name} ({event.country})</h2>
				<h4 class="h4">{event.venue}</h4>
				<p>{ISOToTimeDay(event.time)}</p>
			</div>
		</div>
		<EventReactionStatus eventId={event.id} {reaction} />
	</OpenSlidesButton>
</li>
