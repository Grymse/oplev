<script lang="ts">
	import type { YouTubeEventSlide } from '$lib/slides';
	import { onDestroy, onMount } from 'svelte';
	export let slide: YouTubeEventSlide;
	export let active: boolean = false;
	$: youtubeId = slide.youtube.split('v=')[1].split('&')[0];

	let div: HTMLDivElement;
	let iframe: HTMLIFrameElement;

	// Get size of div and set iframe to that size. Update size on window resize.
	const setIframeSize = () => {
		if (!div || !iframe) return;
		iframe.width = String(div.clientWidth);
		iframe.height = String(div.clientHeight);
	};

	onMount(() => {
		window.addEventListener('resize', setIframeSize);
		setIframeSize();
	});
	onDestroy(() => window.removeEventListener('resize', setIframeSize));
</script>

<div class="w-full h-full pointer-events-none -z-10" bind:this={div}>
	<iframe
		bind:this={iframe}
		width="702"
		height="395"
		src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${active ? 1 : 0}&controls=0`}
		title="Embedded video"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	/>
</div>
