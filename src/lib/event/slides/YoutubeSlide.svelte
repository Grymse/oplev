<script lang="ts">
	import type { YouTubeEventSlide } from '$lib/slides';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';
	export let slide: YouTubeEventSlide;
	export let active: boolean = false;
	$: youtubeId = slide.youtube.split('v=')[1].split('&')[0];

	let div: HTMLDivElement;
	let iframe: HTMLIFrameElement;
	let resizeInterval: NodeJS.Timeout;

	// Get size of div and set iframe to that size. Update size on window resize.
	const setIframeSize = () => {
		if (!div || !iframe) return;
		iframe.width = String(div.clientWidth);
		iframe.height = String(div.clientHeight);
	};

	onMount(() => {
		window.addEventListener('resize', setIframeSize);
		setIframeSize();
		resizeInterval = setInterval(setIframeSize, 100);
	});

	onDestroy(() => {
		window.removeEventListener('resize', setIframeSize);
		clearInterval(resizeInterval);
	});
</script>

<div
	class="w-full h-full flex justify-center items-center pointer-events-none -z-10"
	bind:this={div}
>
	<div class="absolute">
		<ProgressRadial />
	</div>
	<iframe
		bind:this={iframe}
		width="702"
		height="395"
		src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${active ? 1 : 0}&controls=0`}
		title="Embedded video"
		frameborder="0"
		class="z-10"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	/>
</div>
