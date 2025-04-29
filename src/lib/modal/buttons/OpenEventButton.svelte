<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import type { EventInfo } from '../../slides';
	import type { Vector2 } from '../../types/vector';
	import EventDrawer from '../EventDrawer.svelte';

	interface Props {
		event: EventInfo;
		children?: import('svelte').Snippet;
	}

	let { event, children }: Props = $props();

	let startPos: Vector2;

	function handleStart(e: MouseEvent | TouchEvent) {
		const point = e instanceof MouseEvent ? e : e.touches[0];
		startPos = { x: point.clientX, y: point.clientY };
	}

	function handleEnd(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		const point = e instanceof MouseEvent ? e : e.changedTouches[0];
		const deltaX = point.clientX - startPos.x;
		const deltaY = point.clientY - startPos.y;
		const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
		if (distance <= 50) {
			openEventDrawer(e);
		}
	}

	function openEventDrawer(e: MouseEvent | TouchEvent) {
		console.log("Opening event drawer");
	}
</script>

<EventDrawer event={event}>
	{#snippet trigger()}
		<div
			role="button"
			tabindex="-1"
			aria-details="Opens event modal"
			onkeypress={console.log}
			onmousedown={handleStart}
			onmouseup={handleEnd}
			ontouchstart={handleStart}
			ontouchend={handleEnd}
		>
			{@render children?.()}
		</div>
	{/snippet}
</EventDrawer>
