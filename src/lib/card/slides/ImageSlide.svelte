<script lang="ts">
	import type { ImageEventSlide } from '$lib/slides';
	import AudioPlayer from './AudioPlayer.svelte';

	export let slide: ImageEventSlide;
	export let active: boolean = false;
</script>

<div class="w-full h-full relative">
	{#if slide.audio}
		<div class="absolute right-4 top-4">
			<AudioPlayer {active} source={slide.audio} />
		</div>
	{/if}
	<img src={slide.img} alt="Event" class="object-cover pointer-events-none h-full w-full" />
</div>
