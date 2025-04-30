<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ButtonPanel from './ButtonPanel.svelte';
	import Draggable from './event/Draggable.svelte';
	import Event from './event/Event.svelte';
	import type { EventInfo } from './utils/slides';
	const dispatcher = createEventDispatcher();

	type Props = {
		event: EventInfo;
	}

	let { event }: Props = $props();

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

	let interactionVisualization = $state({
		like: 0,
		pass: 0,
		heart: 0
	});

	function toInteractionPercentage(displacement: { x: number; y: number }) {
		return {
			like: Math.max(0, Math.min(1, displacement.x * 3)),
			pass: Math.max(0, Math.min(1, -displacement.x * 3)),
			heart: Math.max(0, Math.min(1, -displacement.y * 5))
		};
	}

	const like = () => {
		dispatcher('like');
	};
	
	const heart = () => {
		dispatcher('heart');
	};

	const pass = () => {
		dispatcher('pass');
	};
</script>

<div class="h-full w-full relative">
	<Draggable on:dragging={onDragging} on:dragend={onDragEnd}>
		<Event {event} active />
	</Draggable>
	<ButtonPanel {interactionVisualization} on:like={like} on:heart={heart} on:pass={pass} />
</div>
