<script lang="ts">
	import Controller from '$lib/Controller.svelte';
	import { onDestroy, onMount } from 'svelte';

	let controllerSize = { width: 0, height: 0 };
	let recalculateSizeInterval: NodeJS.Timeout;

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
		const aspectRatio = 9 / 16;
		const width = window.innerWidth - 16;
		const height = window.innerHeight - 160;
		const windowAspectRatio = width / height;

		if (windowAspectRatio > aspectRatio) {
			return { width: height * aspectRatio, height };
		} else {
			return { width, height: width / aspectRatio };
		}
	}
</script>

<div class="absolute top-0 h-screen w-screen flex justify-center items-center">
	<div style={`height: ${controllerSize.height}px; width: ${controllerSize.width}px;`}>
		<Controller />
	</div>
</div>
