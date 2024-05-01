<script lang="ts">
	import OpenEventButton from '$lib/OpenEventButton.svelte';
	import type { EventInfo } from '$lib/slides';
	import { ISOToTimeDay } from '$lib/translations';
	import Slides from './Slides.svelte';

	export let event: EventInfo;
	export let active: boolean = false;
</script>

<div class="h-full w-full relative my-gradiant shadow-md rounded-container-token overflow-hidden">
	<div
		class="absolute left-0 bottom-0 h-[25%] bg-gradient-to-t from-black from-50 to-transparent to-0 w-full z-10"
	/>
	<OpenEventButton {event}>
		<div class="absolute bottom-8 select-none left-8 z-20">
			<h2 class="h2">{event.name} ({event.country})</h2>
			<h4 class="h4">{event.venue}</h4>
			<p>{ISOToTimeDay(event.time)}</p>
		</div>
	</OpenEventButton>

	<Slides slides={event.slides} {active} />
</div>

<style>
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.my-gradiant {
		background-image: linear-gradient(45deg, var(--from, #f00), var(--to, #00f));
		background-size: 200% 200%;
		animation: gradient 15s ease infinite;
	}
</style>
