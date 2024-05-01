<script lang="ts">
	import type { EventInfo } from '$lib/slides';
	import Slides from './Slides.svelte';

	export let event: EventInfo;
	export let active: boolean = false;

	// format UTZ time to Fri 16:00

	$: time = new Date(event.time).toLocaleDateString('en-GB', {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<div class="h-full w-full relative my-gradiant shadow-md rounded-2xl overflow-hidden">
	<div
		class="absolute left-0 bottom-0 h-[25%] bg-gradient-to-t from-black from-50 to-transparent to-0 w-full z-10"
	/>
	<div class="absolute pointer-events-none bottom-8 left-8 z-10">
		<h2 class="h2">{event.name} ({event.country})</h2>
		<h4 class="h4">{event.venue}</h4>
		<p>{time}</p>
	</div>

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
