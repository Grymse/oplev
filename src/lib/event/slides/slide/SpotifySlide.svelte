<script lang="ts">
	import type { SpotifyEventSlide } from '$lib/utils/slides';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	type Props = {
		slide: SpotifyEventSlide;
	};

	let { slide }: Props = $props();
	let spotifyUrl = $derived(slide.url.split('?')[0] + '?theme=0');
</script>

<div class="flex h-full w-full items-center justify-center pb-20">
	<div
		role="button"
		tabindex="-1"
		onkeypress={(e) => e.stopPropagation()}
		aria-details="Spotify preview of artist"
		onclick={(e) => {
			e.stopPropagation();
			e.preventDefault();
		}}
		class="z-30 flex h-[60%] min-h-[375px] w-[75%] items-center justify-center rounded-xl bg-[#242424]"
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
		<div class="absolute h-full scale-50 items-center justify-center transition">
			<ProgressRing />
		</div>
	</div>
</div>
