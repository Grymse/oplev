<script lang="ts">
	import type { YouTubeEventSlide } from '$lib/utils/slides';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { onDestroy, onMount } from 'svelte';
	type Props = {
		slide: YouTubeEventSlide;
		active?: boolean;
	};

	let { slide, active = false }: Props = $props();

	function getYoutubeId(urlString: string): string {
		const url = new URL(urlString);
		return url.searchParams.get('v') || url.pathname.substring(1);
	}

	let youtubeId = $derived(getYoutubeId(slide.youtube));
	let div: HTMLDivElement | undefined = $state();
	let iframe: HTMLIFrameElement | undefined = $state();
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

<div class="-z-10 flex h-full w-full items-center justify-center" bind:this={div}>
	<div class="absolute">
		<ProgressRing />
	</div>
	<div class="scale-200 transform">
		<iframe
			bind:this={iframe}
			width="1600"
			height="900"
			src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${active ? 1 : 0}&controls=0`}
			title="Embedded artist video"
			frameborder="0"
			class="z-[1]"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
		></iframe>
	</div>
</div>
