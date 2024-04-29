<script lang="ts">
	import ButtonPanel from './ButtonPanel.svelte';
	import Draggable from './card/Draggable.svelte';
	import Event from './card/Event.svelte';
	import eventData from './events.json';
	import { spotToEvent } from './slides';

	// @ts-ignore
	const events = eventData.map(spotToEvent);
	let index = 0;
	$: currentEvent = events[index];
	$: nextEvent = events[index + 1];

	function onDragging(e: CustomEvent<{ x: number; y: number }>) {
		interactionVisualization = toInteractionPercentage(e.detail);
	}

	function onDragEnd(e: CustomEvent<{ x: number; y: number }>) {
		const interaction = toInteractionPercentage(e.detail);

		if (interaction.like > 0.5) {
			like();
		} else if (interaction.pass > 0.5) {
			pass();
		} else if (interaction.heart > 0.5) {
			heart();
		}

		interactionVisualization = {
			like: 0,
			pass: 0,
			heart: 0
		};
	}

	let interactionVisualization = {
		like: 0,
		pass: 0,
		heart: 0
	};

	function toInteractionPercentage(displacement: { x: number; y: number }) {
		return {
			like: Math.max(0, Math.min(1, displacement.x * 3)),
			pass: Math.max(0, Math.min(1, -displacement.x * 3)),
			heart: Math.max(0, Math.min(1, -displacement.y * 5))
		};
	}

	function like() {
		console.log('like');
		index++;
	}

	function pass() {
		console.log('pass');
		index++;
	}

	function heart() {
		console.log('heart');
		index++;
	}
</script>

<div class="h-full w-full relative max-w-3xl">
	<Draggable on:dragging={onDragging} on:dragend={onDragEnd}>
		<Event event={currentEvent} active />
	</Draggable>
	<div class="absolute pointer-events-none -z-10 top-0 left-0 w-full h-full">
		<Event event={nextEvent} />
	</div>
	<ButtonPanel {interactionVisualization} on:like={like} on:heart={heart} on:pass={pass} />
</div>
