<script lang="ts">
	import OpenEventDrawerButton from '$lib/floating-ui/drawer/OpenEventDrawerButton.svelte';
	import type { EventInfo } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import type { Vector2 } from '$lib/types/vector';
	import Slides from './slides/Slides.svelte';

	type Props = {
		event: EventInfo;
		active?: boolean;
	}

	let { event, active = false }: Props = $props();

	let backgroundPosition: Vector2 = $state({ x: 0, y: 0 });

	function randomizeBackgroundColor() {
		backgroundPosition = {
			x: Math.floor(Math.random() * 90 + 5),
			y: Math.floor(Math.random() * 90 + 5)
		}
	}
</script>

<div
	class="h-full w-full relative background-gradient shadow-md rounded-container overflow-hidden"
	style="background-position: {backgroundPosition.x}% {backgroundPosition.y}%;"
>
	<div
		class="absolute left-0 bottom-0 h-[25%] bg-gradient-to-t from-black from-50 to-transparent to-0 w-full z-10"
	></div>
	<OpenEventDrawerButton {event}>
		<div
			class="absolute bottom-8 select-none left-8 z-20 active:text-surface-700-300 duration-50"
		>
			<h2 class="h2">{event.name} ({event.country})</h2>
			<h4 class="h4">{event.venue}</h4>
			<p>{ISOToTimeDay(event.time)}</p>
		</div>
	</OpenEventDrawerButton>

	<Slides slides={event.slides} {active} on:slideChange={randomizeBackgroundColor} />
</div>

<style>
	.background-gradient {
		background-image: linear-gradient(45deg, var(--from, #f00), var(--to, #00f));
		background-size: 200% 200%;
	}
</style>
