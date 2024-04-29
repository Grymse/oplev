<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let divContainer: HTMLDivElement;

	let offset = {
		x: 0,
		y: 0,
		rot: 0
	};

	let isDragging = false;
	let startX = 0;
	let startY = 0;

	const handleMouseDown = (e: MouseEvent) => {
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;
			offset = {
				x: deltaX,
				y: deltaY,
				rot: deltaX / 40
			};
			dispatch('dragging', offsetToPercentage(offset));
		}
	};

	const handleMouseUp = () => {
		isDragging = false;
		dispatch('dragend', offsetToPercentage(offset));
		offset = {
			x: 0,
			y: 0,
			rot: 0
		};
	};

	function offsetToPercentage(offset: { x: number; y: number; rot: number }) {
		return {
			x: offset.x / divContainer.clientWidth,
			y: offset.y / divContainer.clientHeight
		};
	}

	onMount(() => {
		if (!document) return;

		document.addEventListener('mouseup', handleMouseUp);
	});

	onDestroy(() => {
		document.removeEventListener('mouseup', handleMouseUp);
	});
</script>

<div
	role="button"
	aria-roledescription="card"
	aria-label="card"
	tabindex="-1000"
	class="w-full h-full relative overflow-visible"
	on:mousemove={handleMouseMove}
	on:mouseup={handleMouseUp}
>
	<div
		role="button"
		aria-roledescription="card"
		aria-label="card"
		tabindex="0"
		class="w-full h-full absolute"
		style={`transform: translate(${offset.x}px, ${offset.y}px) rotate(${offset.rot}deg);`}
		on:mousedown={handleMouseDown}
		bind:this={divContainer}
	>
		<slot />
	</div>
</div>
