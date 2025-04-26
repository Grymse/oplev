<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let divContainer: HTMLDivElement;

	type Vector2 = { x: number; y: number };
	type Vector2WithRot = { rot: number } & Vector2;

	let isDragging = false;
	let offsetPos: Vector2WithRot = { x: 0, y: 0, rot: 0 };
	let startPos: Vector2 = { x: 0, y: 0 };

	const setDraggingStart = (pos: Vector2) => {
		isDragging = true;
		startPos = pos;
	};

	const setDraggingPos = (pos: Vector2) => {
		if (isDragging) {
			const deltaX = pos.x - startPos.x;
			const deltaY = pos.y - startPos.y;
			offsetPos = {
				x: deltaX,
				y: deltaY,
				rot: deltaX / 40
			};
			dispatch('dragging', offsetToPercentage(offsetPos));
		}
	};

	const handleDragEnd = () => {
		dispatch('dragend', offsetToPercentage(offsetPos));
		isDragging = false;
		offsetPos = {
			x: 0,
			y: 0,
			rot: 0
		};
	};

	function offsetToPercentage(offset: Vector2WithRot) {
		return {
			x: offset.x / divContainer.clientWidth,
			y: offset.y / divContainer.clientHeight
		};
	}

	onMount(() => {
		if (!document) return;

		document.addEventListener('mouseup', handleDragEnd);
		document.addEventListener('touchend', handleDragEnd);
	});

	onDestroy(() => {
		document.removeEventListener('mouseup', handleDragEnd);
		document.removeEventListener('touchend', handleDragEnd);
	});
</script>

<div
	role="button"
	aria-roledescription="card"
	aria-label="card"
	tabindex="-1000"
	class="w-full h-full relative overflow-visible"
	on:mousemove={(e) => setDraggingPos({ x: e.clientX, y: e.clientY })}
	on:touchmove={(e) => setDraggingPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
>
	<div
		role="button"
		aria-roledescription="card"
		aria-label="card"
		tabindex="0"
		class="w-full h-full absolute"
		style={`transform: translate(${offsetPos.x}px, ${offsetPos.y}px) rotate(${offsetPos.rot}deg);`}
		on:mousedown={(e) => setDraggingStart({ x: e.clientX, y: e.clientY })}
		on:touchstart={(e) => setDraggingStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
		bind:this={divContainer}
	>
		<slot />
	</div>
</div>
