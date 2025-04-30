<script lang="ts">
	import { divide, divideVectors, type Vector2, type Vector2WithRot } from '$lib/utils/vectors';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	type Props = {
		children?: Snippet;
		ondragging: (offset: Vector2) => void;
		ondragEnd: (offset: Vector2) => void;
	}

	let { children, ondragEnd, ondragging }: Props = $props();

	let divContainer: HTMLDivElement | undefined = $state();

	let isDragging = false;
	let offsetPos: Vector2WithRot = $state({ x: 0, y: 0, rot: 0 });
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
			ondragging(offsetToPercentage(offsetPos));
		}
	};

	const handleDragEnd = () => {
		ondragEnd(offsetToPercentage(offsetPos));
		isDragging = false;
		offsetPos = {
			x: 0,
			y: 0,
			rot: 0
		};
	};

	function offsetToPercentage(offset: Vector2WithRot) : Vector2 {
		if (!divContainer) return { x: 0, y: 0 };

		const clientVector = {
			x: divContainer.clientWidth,
			y: divContainer.clientHeight
		}

		return divideVectors(offset, clientVector);
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
	onmousemove={(e) => setDraggingPos({ x: e.clientX, y: e.clientY })}
	ontouchmove={(e) => setDraggingPos({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
>
	<div
		role="button"
		aria-roledescription="card"
		aria-label="card"
		tabindex="0"
		class="w-full h-full absolute"
		style={`transform: translate(${offsetPos.x}px, ${offsetPos.y}px) rotate(${offsetPos.rot}deg);`}
		onmousedown={(e) => setDraggingStart({ x: e.clientX, y: e.clientY })}
		ontouchstart={(e) => setDraggingStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
		bind:this={divContainer}
	>
		{@render children?.()}
	</div>
</div>
