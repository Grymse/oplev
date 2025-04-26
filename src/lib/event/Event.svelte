<script lang="ts">
	import OpenEventButton from '$lib/drawer/buttons/OpenEventButton.svelte';
	import type { EventInfo } from '$lib/slides';
	import { ISOToTimeDay } from '$lib/translations';
	import Slides from './slides/Slides.svelte';

	export let event: EventInfo;
	export let active: boolean = false;

	let x = 50, y = 50;

	function randomizeBackgroundColor() {
		x = Math.floor(Math.random() * 90 + 5);
		y = Math.floor(Math.random() * 90 + 5);
	}
</script>

<div
	class="h-full w-full relative background-gradient shadow-md rounded-container-token overflow-hidden"
	style="background-position: {x}% {y}%;"
>
	<div
		class="absolute left-0 bottom-0 h-[25%] bg-gradient-to-t from-black from-50 to-transparent to-0 w-full z-10"
	/>
	<OpenEventButton {event}>
		<div
			class="absolute bottom-8 select-none left-8 z-20 active:text-surface-600-300-token duration-50"
		>
			<h2 class="h2">{event.name} ({event.country})</h2>
			<h4 class="h4">{event.venue}</h4>
			<p>{ISOToTimeDay(event.time)}</p>
		</div>
	</OpenEventButton>

	<Slides slides={event.slides} {active} on:slideChange={randomizeBackgroundColor} />
</div>

<style>
	.background-gradient {
		background-image: linear-gradient(45deg, var(--from, #f00), var(--to, #00f));
		background-size: 200% 200%;
	}
</style>
