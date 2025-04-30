<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	type Props = {
		ratio: number;
		children: Snippet;
		offsetMaxHeight?: number;
		offsetMaxWidth?: number;
	}

	let { ratio, children, offsetMaxHeight = 0, offsetMaxWidth = 0 }: Props = $props();

	let controllerSize = $state({ width: 0, height: 0 });
	let recalculateSizeInterval: NodeJS.Timeout;
	let divContainer: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (divContainer) controllerSize = calculateAspectRatio(divContainer);
		recalculateSizeInterval = setInterval(() => {
			if (divContainer) controllerSize = calculateAspectRatio(divContainer);
		}, 100);
	});

	onDestroy(() => {
		clearInterval(recalculateSizeInterval);
	});

	function calculateAspectRatio(div: HTMLElement) {
		const width = div.clientWidth + offsetMaxWidth;
		const height = div.clientHeight + offsetMaxHeight;
		const windowAspectRatio = width / height;

		if (windowAspectRatio > ratio) {
			return { width: height * ratio, height };
		} else {
			return { width, height: width / ratio };
		}
	}
</script>

<div bind:this={divContainer} class="h-full w-full flex justify-center items-center">
	<div style={`height: ${controllerSize.height}px; width: ${controllerSize.width}px;`}>
		{@render children()}
	</div>
</div>
