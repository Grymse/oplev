<script lang="ts">
	import { type Vector2, distance } from '$lib/utils/vectors';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		maxDragPx?: number;
	};

	let { children, maxDragPx = 50 }: Props = $props();

	let startPos: Vector2;

	function handleStart(e: MouseEvent | TouchEvent) {
		startPos = getPoint(e);
	}

	function getPoint(e: MouseEvent | TouchEvent) {
		const point = e instanceof MouseEvent ? e : e.changedTouches[0];
		return { x: point.clientX, y: point.clientY };
	}

	function handleEnd(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		const dragDistance = distance(getPoint(e), startPos);

		if (maxDragPx < dragDistance) return;

		openEventDrawer();
	}

	function openEventDrawer() {
		console.log('Opening event drawer');
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
