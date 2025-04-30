<script lang="ts">
	import { createBubbler, stopPropagation, preventDefault } from 'svelte/legacy';

	const bubble = createBubbler();
	import type { SpotifyEventSlide } from '$lib/utils/slides';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	type Props = {
		slide: SpotifyEventSlide;
	}

	let { slide }: Props = $props();
	let spotifyUrl = $derived(slide.url.split('?')[0] + '?theme=0');
</script>

<div class="w-full h-full flex justify-center items-center pb-20">
	<div
		role="button"
		tabindex="-1"
		onkeypress={stopPropagation(bubble('keypress'))}
		aria-details="Spotify preview of artist"
		onclick={stopPropagation(preventDefault(bubble('click')))}
		class="z-30 bg-[#242424] rounded-xl w-[75%] h-[60%] flex justify-center items-center"
	>
		<iframe
			title="Spotify preview of artist"
			style="border-radius:12px; z-index: 30;"
			src={spotifyUrl}
			width="100%"
			height="100%"
			frameBorder="0"
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
		></iframe>
		<div class="absolute scale-50 top-24 transition">
			<ProgressRing />
		</div>
	</div>
</div>
