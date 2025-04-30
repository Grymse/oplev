<script lang="ts">
	import ButtonPanel from './ButtonPanel.svelte';
	import Draggable from './event/Draggable.svelte';
	import Event from './event/Event.svelte';
	import type { EventInfo, EventReaction } from './utils/slides';
	import type { Vector2 } from './utils/vectors';

	type Props = {
		event: EventInfo;
		onreact: (reaction: EventReaction) => void;
	}

	let { event, onreact }: Props = $props();

	function ondragging(vector: Vector2) {
		interactionVisualization = toInteractionPercentage(vector);
	}

	function ondragEnd(vector: Vector2) {
		const interaction = toInteractionPercentage(vector);

		if (interaction.like > 0.5) {
			onreact('like');
		} else if (interaction.pass > 0.5) {
			onreact('pass');
		} else if (interaction.heart > 0.5) {
			onreact('heart');
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
</script>

<div class="h-full w-full relative">
	<Draggable {ondragging} {ondragEnd}>
		<Event {event} active />
	</Draggable>
	<ButtonPanel {interactionVisualization} {onreact} />
</div>
