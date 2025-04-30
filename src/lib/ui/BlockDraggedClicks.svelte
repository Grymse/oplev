<script lang="ts">
	import type { Vector2 } from '$lib/types/vector';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		maxDragPx?: number;
	}

	let { children, maxDragPx=50 }: Props = $props();

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
		if (distance <= maxDragPx) {
			openEventDrawer(e);
		}
	}

	function openEventDrawer(e: MouseEvent | TouchEvent) {
		console.log("Opening event drawer");
	}
</script>

<div
	role="button"
	tabindex="-1"
	aria-details="Opens event modal"
	onmousedown={handleStart}
	onmouseup={handleEnd}
	ontouchstart={handleStart}
	ontouchend={handleEnd}
>
	{@render children?.()}
</div>
