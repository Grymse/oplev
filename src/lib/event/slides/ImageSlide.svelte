<script lang="ts">
	import type { ImageEventSlide } from '$lib/slides';
	import AudioPlayer from './helpers/AudioPlayer.svelte';

	export let slide: ImageEventSlide;
	export let active: boolean = false;
</script>

{#if slide.audio}
	<div class="absolute z-10 right-4 top-6">
		<AudioPlayer {active} source={slide.audio} />
	</div>
{/if}
<img src={slide.img} alt="Event" class="object-cover pointer-events-none h-full w-full" />
