<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	export let ratio: number;

	let controllerSize = { width: 0, height: 0 };
	let recalculateSizeInterval: NodeJS.Timeout;
	let divContainer: HTMLDivElement;

	onMount(() => {
		controllerSize = calculateAspectRatio();
		recalculateSizeInterval = setInterval(() => {
			controllerSize = calculateAspectRatio();
		}, 100);
	});

	onDestroy(() => {
		clearInterval(recalculateSizeInterval);
	});

	function calculateAspectRatio() {
		const width = divContainer.clientWidth - 16;
		const height = divContainer.clientHeight - 160;
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
		<slot />
	</div>
</div>
