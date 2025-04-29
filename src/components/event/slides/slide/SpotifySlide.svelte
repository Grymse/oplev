<script lang="ts">
	import type { SpotifyEventSlide } from '$lib/slides';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let slide: SpotifyEventSlide;
	$: spotifyUrl = slide.url.split('?')[0] + '?theme=0';
</script>

<div class="w-full h-full flex justify-center items-center pb-20">
	<div
		role="button"
		tabindex="-1"
		on:keypress|stopPropagation
		aria-details="Spotify preview of artist"
		on:click|stopPropagation|preventDefault
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
		/>
		<div class="absolute scale-50 top-24 transition">
			<ProgressRadial />
		</div>
	</div>
</div>
